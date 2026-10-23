// Navigation index only: IDs resolve to the original drJoeLibrary objects.
// Areas reflect movement names and supplied goals, not new treatment guidance.
export const muscleAreas: { id: string; label: string; basis: string; exerciseIds: string[] }[] = [
  { id: "foot-ankle", label: "Foot & ankle", basis: "Foot control, ankle dorsiflexion and tibial rotation.", exerciseIds: ["s01-tibial-ir", "s01-knee-over-toe", "s01-wall-dorsiflexion", "s01-ankle-stretch", "s01-short-foot", "s01-tripod-hold", "s02-knee-wall"] },
  { id: "hip-glutes", label: "Hip & glutes", basis: "Hip rotation, TFL, glute activation and pelvic control.", exerciseIds: ["s01-hip-liftoff", "s01-clamshell", "s02-hip-ir", "s02-glute-bridge", "s02-step-down", "s03-foam-roll-tfl", "s03-tfl-stretch", "s04-wall-supported-control", "s06-verteq-release", "s06-hip-shift", "s06-lock-clam"] },
  { id: "inner-thigh", label: "Inner thigh", basis: "Adductor activation.", exerciseIds: ["s03-copenhagen-adduction"] },
  { id: "hamstrings", label: "Hamstrings", basis: "Hamstring activation and eccentric slides.", exerciseIds: ["s05-pelvis-rib-cage-breathing", "s06-hamstring-slides"] },
  { id: "core-trunk", label: "Core & trunk", basis: "QL, paraspinal release, rib-cage breathing and thoracic rotation.", exerciseIds: ["s03-foam-roll-ql", "s03-ql-stretch", "s03-side-plank", "s04-wall-supported-control", "s05-pelvis-rib-cage-breathing", "s06-verteq-release", "s07-side-plank-rotations"] },
  { id: "lower-body", label: "Lower-body strength", basis: "Squat patterns and single-leg loading across the lower limb.", exerciseIds: ["s02-step-down", "s02-split-squat", "s02-goblet-squat"] },
];
