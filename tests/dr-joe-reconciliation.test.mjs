import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';

async function load(path) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8').replace(/^import type .*;\n/gm, '');
  return import(`data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString('base64')}`);
}

test('reconciles sessions 01–07 without inventing missing prescriptions', async () => {
  const { drJoeLibrary, dailyDrJoeWarmup } = await load('../app/training-data.ts');
  assert.deepEqual(drJoeLibrary.map(s => s.number), ['01','02','03','04','05','06','07']);
  assert.deepEqual(drJoeLibrary.map(s => s.exercises.length), [8,6,6,1,1,4,1]);
  const expected = [
    ['s04-wall-supported-control', '5 sets × hold 10–15 sec · both sides', undefined, 5],
    ['s05-pelvis-rib-cage-breathing', '2 sets × 10 slow breaths', 'https://www.facebook.com/reel/834211419781501', 2],
    ['s06-verteq-release', 'Dosage not supplied — confirm with Dr. Joe', undefined, 0],
    ['s06-hip-shift', '2–3 sets × 10 deep breaths · hold rather than reps', 'https://www.youtube.com/shorts/vM92OGZXH3g', 2],
    ['s06-lock-clam', '3 sets × 12 reps', 'https://www.youtube.com/shorts/F1_dSq8vggY', 3],
    ['s06-hamstring-slides', '3 sets × 10 reps', 'https://www.youtube.com/watch?v=JGcxXlB6qdI', 3],
    ['s07-side-plank-rotations', '2–3 sets × 10 reps · both sides', 'https://www.youtube.com/watch?v=OMc5f_JUDUU', 2],
  ];
  for (const [id, prescription, video, sets] of expected) {
    const library = drJoeLibrary.flatMap(s => s.exercises).find(e => e.id === id);
    assert.ok(library, id);
    assert.equal(library.prescription, prescription);
    assert.equal(library.video, video);
    assert.equal(library.sets, sets);
    assert.equal(dailyDrJoeWarmup.find(e => e.id === `warmup-${id}`), undefined);
  }
  assert.equal(dailyDrJoeWarmup.length, 19);
  for (const workout of (await load('../app/training-data.ts')).workouts) {
    assert.equal(workout.warmup.length, 19);
  }
  assert.equal(new Set(dailyDrJoeWarmup.map(e => e.id)).size, dailyDrJoeWarmup.length);
  assert.ok(drJoeLibrary[6].continuation.includes('ankle dorsiflexion'));
  const hip = drJoeLibrary[1].exercises.find(e => e.id === 's02-hip-ir');
  assert.equal(hip.prescription, '2 sets × 10 reps · left');
  assert.equal(hip.video, drJoeLibrary[0].exercises.find(e => e.id === 's01-hip-liftoff').video);
  assert.match(drJoeLibrary[2].continuation, /2 sets × 15 reps both sides/);
  assert.ok(drJoeLibrary[5].exercises.some(e => e.id === 's06-lock-clam'));
  assert.ok(drJoeLibrary[0].exercises.some(e => e.id === 's01-clamshell'));
  assert.ok(drJoeLibrary[2].exercises.some(e => e.id === 's03-side-plank'));
});

test('reference-only cards cannot appear completed or create empty demo links', () => {
  const app = readFileSync(new URL('../app/training-app.tsx', import.meta.url), 'utf8');
  assert.ok(app.includes('const complete = exercise.sets > 0 && done === exercise.sets;'));
  assert.ok(app.includes('{exercise.video && <a className="video-link" href={exercise.video}'));
  assert.ok(app.includes('{exercise.goal && <p className="exercise-goal">Why: {exercise.goal}</p>}'));
  assert.ok(app.includes('Sessions 01–07'));
});

test('public library covers supplied movements once without personal health context', async () => {
  const { libraryExercises, muscleGroups } = await load('../app/recovery-library/library-data.ts');
  assert.equal(libraryExercises.length, 27);
  assert.ok(muscleGroups.some(g => g.id === 'trunk'));
  const videos = libraryExercises.map(e => e.video).filter(Boolean);
  assert.equal(new Set(videos).size, videos.length - 1);
  const hip = libraryExercises.find(e => e.id === "half-kneeling-hip-ir");
  assert.equal(hip.intensity, "Session 02 · 2 sets × 10 reps · left");
  assert.match(hip.description, /not confirmed/);
  assert.match(libraryExercises.find(e => e.id === "clamshell").description, /Session 03: 2 sets × 15 reps both sides/);
  for (const id of ['foam-roll-tfl','foam-roll-ql','tfl-stretch','ql-stretch','copenhagen-adduction','side-plank','wall-supported-control','pelvis-rib-cage-breathing','verteq-release','hip-shift','lock-clam','hamstring-slides','side-plank-rotations']) {
    assert.ok(libraryExercises.some(e => e.id === id), id);
    const app = readFileSync(new URL('../app/recovery-library/library-app.tsx', import.meta.url), 'utf8');
    assert.ok(app.includes(`"${id}":`), `Vietnamese translation: ${id}`);
  }
  assert.doesNotMatch(JSON.stringify(libraryExercises), /surgery|diagnos|syndrome|assessment|hip hike|left hip more anteriorly/i);
  assert.equal(libraryExercises.find(e => e.id === 'verteq-release').video, undefined);
});
