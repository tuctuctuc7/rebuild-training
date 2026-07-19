import assert from "node:assert/strict";
import test from "node:test";

import {
  applyGymCustomization,
  createGymCustomization,
  countCompletedSets,
  normalizeSavedGymExercises,
  trimWorkoutExerciseProgress,
} from "../app/gym-customization.ts";

const suggestedExercise = {
  id: "gym-a-push",
  slot: "push",
  name: "Chest press",
  prescription: "2 sets × 6–8 reps",
  sets: 2,
  restSeconds: 75,
  video: "https://example.com/chest-press",
  cues: ["Smooth tempo", "Keep two reps in reserve"],
};

test("applies a saved exercise name and prescription without changing slot tracking", () => {
  const customized = applyGymCustomization(suggestedExercise, {
    name: "Dumbbell bench press",
    prescription: "8 reps",
    sets: 3,
  });

  assert.equal(customized.name, "Dumbbell bench press");
  assert.equal(customized.prescription, "8 reps");
  assert.equal(customized.id, "gym-a-push");
  assert.equal(customized.slot, "push");
  assert.equal(customized.sets, 3);
  assert.equal(customized.restSeconds, 75);
  assert.equal(customized.video, undefined);
  assert.equal(customized.goal, undefined);
  assert.equal(customized.side, undefined);
  assert.deepEqual(customized.cues, []);
});

test("keeps the suggested exercise when no customization is saved", () => {
  assert.deepEqual(applyGymCustomization(suggestedExercise), suggestedExercise);
});

test("ignores previously completed sets beyond a newly reduced custom set count", () => {
  assert.equal(countCompletedSets([true, true, true], 2), 2);
});

test("permanently trims hidden completed sets when a custom set count changes", () => {
  const progress = {
    "2026-07-14:gym-a": {
      "gym-a-push": [true, true, true],
      "gym-a-pull": [true, false],
    },
    "2026-07-15:gym-b": { "gym-b-push": [true, true, true] },
  };

  assert.deepEqual(trimWorkoutExerciseProgress(progress, "gym-a", "gym-a-push", 2), {
    "2026-07-14:gym-a": {
      "gym-a-push": [true, true],
      "gym-a-pull": [true, false],
    },
    "2026-07-15:gym-b": { "gym-b-push": [true, true, true] },
  });
  assert.deepEqual(progress["2026-07-14:gym-a"]["gym-a-push"], [true, true, true]);
});

test("keeps the cardio slot fixed at one 15-minute block", () => {
  assert.deepEqual(createGymCustomization("cardio", "Stationary bike", 4, "5 min"), {
    name: "Stationary bike",
    sets: 1,
    prescription: "15 min",
  });
  assert.deepEqual(createGymCustomization("push", "Dumbbell press", 3, "8 reps"), {
    name: "Dumbbell press",
    sets: 3,
    prescription: "8 reps",
  });
  assert.equal(createGymCustomization("push", "", 3, "8 reps"), null);
});

test("normalizes legacy or malformed local storage safely", () => {
  assert.deepEqual(normalizeSavedGymExercises(undefined), {});
  assert.deepEqual(normalizeSavedGymExercises({
    "gym-a:push": { name: "  Machine press  ", prescription: "  10 reps  ", sets: 3 },
    "gym-a:pull": { name: "", prescription: "8 reps", sets: 3 },
    "gym-a:arms": { name: "Curl", prescription: "10 reps", sets: 0 },
    "gym-a:cardio": { name: "Bike", prescription: "5 min", sets: 4 },
    invalid: "not an exercise",
  }), {
    "gym-a:push": { name: "Machine press", prescription: "10 reps", sets: 3 },
    "gym-a:cardio": { name: "Bike", prescription: "15 min", sets: 1 },
  });
});
