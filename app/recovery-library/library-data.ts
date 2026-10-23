export type MuscleGroupId = "ankle-foot" | "hip-glute" | "lower-body-strength" | "trunk";

export type MuscleGroup = {
  id: MuscleGroupId;
  label: string;
  summary: string;
};

export type LibraryExercise = {
  id: string;
  name: string;
  group: MuscleGroupId;
  intensity: string;
  video?: string;
  alternateVideo?: string;
  description: string;
};

export const muscleGroups: MuscleGroup[] = [
  {
    id: "ankle-foot",
    label: "Ankle & Foot",
    summary: "Mobility, arch control and balance drills for cleaner force transfer from the ground up.",
  },
  {
    id: "hip-glute",
    label: "Hip & Glute",
    summary: "Hip rotation and glute activation drills that support pelvis control and single-leg stability.",
  },
  {
    id: "lower-body-strength",
    label: "Lower-Body Strength",
    summary: "Strength patterns for squatting, single-leg loading and resilient lower-limb mechanics.",
  },
  { id: "trunk", label: "Trunk & Back", summary: "Release, breathing and rotation drills for trunk control." },
];

export const libraryExercises: LibraryExercise[] = [
  {
    id: "tibial-ir",
    name: "Tibial Internal Rotation Mobilisation",
    group: "ankle-foot",
    intensity: "2 sets × 15 reps each side",
    video: "https://www.youtube.com/shorts/_-6RLEBq84E",
    description: "Builds controlled shin rotation so the foot, ankle and knee can share load more smoothly during walking, running and change of direction.",
  },
  {
    id: "knee-over-toe-ir",
    name: "Knee Over Toe with Tibial Internal Rotation",
    group: "ankle-foot",
    intensity: "2 sets × 10 reps each side",
    video: "https://www.youtube.com/shorts/3HucseP0VA0",
    description: "Coordinates knee travel, shin rotation and foot position under load, which helps the lower leg absorb force with better alignment.",
  },
  {
    id: "wall-dorsiflexion",
    name: "Dorsiflexion Mobilisation Against Wall",
    group: "ankle-foot",
    intensity: "2 sets × 10–15 reps each side",
    video: "https://www.youtube.com/shorts/HYFeP-R0m54",
    description: "Improves ankle dorsiflexion range so the knee can travel forward without the arch collapsing or the foot turning out.",
  },
  {
    id: "ankle-dorsiflexion-stretch",
    name: "Half-Kneeling Ankle Dorsiflexion Stretch",
    group: "ankle-foot",
    intensity: "2 sets × 20–30 sec each side",
    video: "https://www.youtube.com/shorts/gUltNrPPE28",
    alternateVideo: "https://www.youtube.com/shorts/wKWAOJ4tAhM",
    description: "A gentle calf and ankle mobility drill that can make squatting, running and court movement feel less restricted.",
  },
  {
    id: "short-foot",
    name: "Short Foot Exercise",
    group: "ankle-foot",
    intensity: "2 sets × 10 reps each side · hold 3 sec",
    video: "https://www.youtube.com/shorts/D9qjQWqVIlI",
    description: "Trains the intrinsic foot muscles to lift and control the arch without curling the toes, supporting better foot stability.",
  },
  {
    id: "tripod-hold",
    name: "Tripod Single-Leg Hold on Blocks",
    group: "ankle-foot",
    intensity: "2 sets × 20–30 sec each side",
    video: "https://www.facebook.com/JoeOsteopath/videos/2971402579877027/",
    description: "Develops balance through the heel, big toe and little toe contact points so standing and cutting mechanics feel more stable.",
  },
  {
    id: "hip-ir-liftoff",
    name: "90/90 Hip Internal Rotation Lift-Off",
    group: "hip-glute",
    intensity: "Session 01 · 2 sets × 8 reps each side",
    video: "https://www.youtube.com/shorts/jAA1Sh2IGL4",
    description: "Strengthens active hip internal rotation in a small controlled range, helping the hip rotate without borrowing motion from the lower back.",
  },
  {
    id: "half-kneeling-hip-ir",
    name: "Half-Kneeling Hip Internal Rotation · Session 02 variant",
    group: "hip-glute",
    intensity: "Session 02 · 2 sets × 10 reps · left",
    video: "https://www.youtube.com/shorts/jAA1Sh2IGL4",
    description: "Session 02 supplies a different dose and side from Session 01 (2 sets × 8 reps each side), despite sharing the demo. Replacement or combination is not confirmed; neither variant is assumed to supersede the other.",
  },
  {
    id: "clamshell",
    name: "Clamshell",
    group: "hip-glute",
    intensity: "Session 01: 2 sets × 12–15 reps each side · Session 03: 2 sets × 15 reps both sides",
    video: "https://www.youtube.com/shorts/39vuP5xozsI",
    description: "Session 01: 2 sets × 12–15 reps each side. Session 03: 2 sets × 15 reps both sides. Replacement or combination is not confirmed. The demo shown is from Session 01; the Session 03 link is malformed and is not substituted.",
  },
  {
    id: "single-leg-glute-bridge",
    name: "Single-Leg Glute Bridge",
    group: "hip-glute",
    intensity: "3 sets × 8–10 reps each side · hold 2 sec",
    video: "https://www.youtube.com/shorts/qB_bC7-CQjI",
    description: "Builds glute drive and pelvis control in hip extension without needing heavy loading.",
  },
  {
    id: "knee-to-wall",
    name: "Knee-to-Wall Ankle Mobilisation",
    group: "ankle-foot",
    intensity: "3 sets × 10 reps each side",
    video: "https://www.youtube.com/watch?v=rvkyQc60-HA",
    description: "A simple ankle mobility benchmark and drill for improving forward knee travel while keeping the heel grounded.",
  },
  {
    id: "lateral-step-down",
    name: "Lateral Step-Down",
    group: "lower-body-strength",
    intensity: "2–3 sets × 8 reps each side",
    video: "https://www.youtube.com/shorts/XCJl_ju19qw",
    description: "Trains controlled single-leg lowering, hip stability and knee tracking for stairs, deceleration and change-of-direction work.",
  },
  {
    id: "split-squat",
    name: "Split Squat",
    group: "lower-body-strength",
    intensity: "2–3 sets × 8 reps each side",
    video: "https://www.youtube.com/shorts/ynGQy_GOfrQ",
    description: "Builds lower-body strength through a staggered stance while challenging balance, hip control and even loading between sides.",
  },
  {
    id: "goblet-squat",
    name: "Goblet Squat",
    group: "lower-body-strength",
    intensity: "3 sets × 8 reps",
    video: "https://www.youtube.com/shorts/ycPCpTH0QGo",
    description: "A front-loaded squat variation that reinforces a balanced squat pattern, upright trunk and controlled lower-body strength.",
  },
  {"id": "foam-roll-tfl", "name": "Foam Roll TFL", "group": "hip-glute", "intensity": "2 sets × 60–90 sec · left", "description": "A foam-roller release for the tensor fasciae latae at the outer hip.", "video": "https://www.youtube.com/shorts/dCSN5TdsmxU"},
  {"id": "foam-roll-ql", "name": "Foam Roll Quadratus Lumborum", "group": "trunk", "intensity": "2 sets × 60–90 sec · left", "description": "A foam-roller release targeting the quadratus lumborum.", "video": "https://www.youtube.com/shorts/qMtQuXl5skM"},
  {"id": "tfl-stretch", "name": "TFL Stretch", "group": "hip-glute", "intensity": "4–5 reps × hold 30 sec · left", "description": "A stretch for the tensor fasciae latae at the outer hip.", "video": "https://www.youtube.com/watch?v=q9ZHa9Fgblw"},
  {"id": "ql-stretch", "name": "Quadratus Lumborum Stretch", "group": "trunk", "intensity": "4–5 reps × hold 30 sec · left", "description": "A stretch targeting the quadratus lumborum along the side of the lower trunk.", "video": "https://www.youtube.com/shorts/GMyCznjjU20"},
  {"id": "copenhagen-adduction", "name": "Copenhagen Adduction", "group": "lower-body-strength", "intensity": "2–3 sets × 8–10 reps · left adductor focus", "description": "An adductor-strength exercise supporting pelvic stability.", "video": "https://www.youtube.com/shorts/CYfcIXEA78s"},
  {"id": "side-plank", "name": "Side Plank", "group": "trunk", "intensity": "2–3 sets · hold until fatigue · right", "description": "An isometric side-support exercise for trunk and pelvic control.", "video": "https://www.youtube.com/shorts/sKMD_pbNm7w"},
  {"id": "wall-supported-control", "name": "Wall-supported TFL / Glute / QL Control", "group": "trunk", "intensity": "5 sets × hold 10–15 sec · both sides", "description": "A side-lying drill combining wall foot contact, a foam-roller hand support and an overhead reach. The supplied right-side setup uses the left side on the floor, right hip at about 90°, and right foot moved back only until just before the lower back arches. Lift the left trunk gently while reaching the right arm toward the head. No video was supplied; confirm the setup with your clinician."},
  {"id": "pelvis-rib-cage-breathing", "name": "Pelvis and Rib-Cage Breathing Drill", "group": "trunk", "intensity": "2 sets × 10 slow breaths", "description": "A pattern-specific breathing drill coordinating hamstring activation and rib-cage counter-rotation. The dose comes from the linked demo. Confirm suitability and side-specific setup with your clinician.", "video": "https://www.facebook.com/reel/834211419781501"},
  {"id": "verteq-release", "name": "Psoas and Paraspinal Release · Verteq Tool", "group": "trunk", "intensity": "Dosage not supplied — confirm with your clinician", "description": "Tool-assisted release targeting the psoas and paraspinal muscles. This is a reference only: technique, dose and demo were not supplied."},
  {"id": "hip-shift", "name": "90/90 Hip Shift", "group": "hip-glute", "intensity": "2–3 sets × 10 deep breaths · hold rather than reps", "description": "A held hip-shift position paired with deep breathing. Confirm side-specific setup with your clinician.", "video": "https://www.youtube.com/shorts/vM92OGZXH3g"},
  {"id": "lock-clam", "name": "Lock Clam", "group": "hip-glute", "intensity": "3 sets × 12 reps", "description": "A clam variation with the top foot behind the opposite calf, distinct from the standard clamshell. Confirm side-specific setup with your clinician.", "video": "https://www.youtube.com/shorts/F1_dSq8vggY"},
  {"id": "hamstring-slides", "name": "Eccentric Hamstring Slides · Regression", "group": "lower-body-strength", "intensity": "3 sets × 10 reps", "description": "A bridge-based hamstring drill using a controlled outward heel slide.", "video": "https://www.youtube.com/watch?v=JGcxXlB6qdI"},
  {"id": "side-plank-rotations", "name": "Side Plank Rotations", "group": "trunk", "intensity": "2–3 sets × 10 reps · both sides", "description": "Adds thoracic rotation to a side plank, distinct from a static side-plank hold.", "video": "https://www.youtube.com/watch?v=OMc5f_JUDUU"},
];

export function exercisesForGroup(group: MuscleGroupId) {
  return libraryExercises.filter((exercise) => exercise.group === group);
}
