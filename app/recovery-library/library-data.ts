export type MuscleGroupId = "ankle-foot" | "hip-glute" | "lower-body-strength";

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
  video: string;
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
    intensity: "2 sets × 8 reps each side",
    video: "https://www.youtube.com/shorts/jAA1Sh2IGL4",
    description: "Strengthens active hip internal rotation in a small controlled range, helping the hip rotate without borrowing motion from the lower back.",
  },
  {
    id: "half-kneeling-hip-ir",
    name: "Half-Kneeling Hip Internal Rotation Mobilisation",
    group: "hip-glute",
    intensity: "2 sets × 10 reps each side",
    video: "https://www.youtube.com/shorts/jAA1Sh2IGL4",
    description: "Opens hip internal rotation while the pelvis stays quiet, making it useful before squats, lunges and court movement.",
  },
  {
    id: "clamshell",
    name: "Clamshell",
    group: "hip-glute",
    intensity: "2 sets × 12–15 reps each side",
    video: "https://www.youtube.com/shorts/39vuP5xozsI",
    description: "Targets the side glutes to improve hip stability and reduce unwanted pelvis or lower-back compensation during single-leg positions.",
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
];

export function exercisesForGroup(group: MuscleGroupId) {
  return libraryExercises.filter((exercise) => exercise.group === group);
}
