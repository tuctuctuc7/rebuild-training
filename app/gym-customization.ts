export type GymSlot = "push" | "pull" | "arms" | "abs" | "cardio";

export type GymCustomization = {
  name: string;
  prescription: string;
  sets: number;
};

export type SavedGymExercises = Record<string, GymCustomization>;

export function countCompletedSets(checks: boolean[], sets: number): number {
  return checks.slice(0, sets).filter(Boolean).length;
}

type CustomizableExercise = {
  id: string;
  slot?: GymSlot;
  name: string;
  prescription: string;
  sets: number;
  restSeconds: number;
  video?: string;
  cues: string[];
  [key: string]: unknown;
};

export function applyGymCustomization<T extends CustomizableExercise>(
  suggested: T,
  customization?: GymCustomization,
): T {
  if (!customization) return suggested;
  return {
    ...suggested,
    name: customization.name,
    prescription: customization.prescription,
    sets: customization.sets,
    video: undefined,
    goal: undefined,
    side: undefined,
    cues: [],
  };
}

export function normalizeSavedGymExercises(value: unknown): SavedGymExercises {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const normalized: SavedGymExercises = {};
  for (const [key, candidate] of Object.entries(value)) {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) continue;
    const name = typeof (candidate as { name?: unknown }).name === "string"
      ? (candidate as { name: string }).name.trim()
      : "";
    const prescription = typeof (candidate as { prescription?: unknown }).prescription === "string"
      ? (candidate as { prescription: string }).prescription.trim()
      : "";
    const sets = Number((candidate as { sets?: unknown }).sets);
    if (name && prescription && Number.isInteger(sets) && sets >= 1 && sets <= 20) {
      normalized[key] = { name, prescription, sets };
    }
  }
  return normalized;
}
