import type { GymSlot } from "./gym-customization";

export type Exercise = {
  id: string;
  name: string;
  prescription: string;
  sets: number;
  restSeconds: number;
  side?: string;
  video?: string;
  cues: string[];
  goal?: string;
  slot?: GymSlot;
};

export type Workout = {
  id: string;
  weekday: number;
  day: string;
  shortDay: string;
  type: "tennis" | "strength" | "recovery" | "rest";
  title: string;
  duration: string;
  intensity: string;
  note: string;
  warmup?: Exercise[];
  exercises: Exercise[];
};

export type LibraryExercise = {
  id: string;
  name: string;
  prescription: string;
  video?: string;
  alternateVideo?: string;
  cues: string[];
  goal: string;
};

export type DrJoeSession = {
  id: string;
  number: string;
  title: string;
  summary: string;
  continuation?: string;
  exercises: LibraryExercise[];
};

const tibial: Exercise = {
  id: "tibial-ir",
  name: "Tibial internal rotation",
  prescription: "15 controlled reps each side",
  sets: 1,
  restSeconds: 30,
  side: "Both sides",
  video: "https://www.youtube.com/shorts/_-6RLEBq84E",
  cues: ["Keep the whole foot in contact", "Rotate the shin—not the hip", "Move slowly and stay controlled"],
  goal: "Prepare the lower leg to absorb and redirect force.",
};

const kneeOverToe: Exercise = {
  id: "knee-over-toe-ir",
  name: "Knee over toe + shin rotation",
  prescription: "10 reps each side",
  sets: 1,
  restSeconds: 30,
  side: "Both sides",
  video: "https://www.youtube.com/shorts/3HucseP0VA0",
  cues: ["Bring the knee forward", "Keep the foot pointing straight", "Do not rush the range"],
  goal: "Coordinate foot, shin and knee during loading.",
};

const kneeWall: Exercise = {
  id: "knee-wall-left",
  name: "Knee-to-wall ankle mobility",
  prescription: "10 reps",
  sets: 1,
  restSeconds: 30,
  side: "Left priority",
  video: "https://www.youtube.com/watch?v=rvkyQc60-HA",
  cues: ["Keep the heel down", "Drive the knee forward slowly", "Keep the arch lifted; do not collapse inward"],
  goal: "Restore left ankle dorsiflexion after Achilles surgery.",
};

const shortFoot: Exercise = {
  id: "short-foot",
  name: "Short foot",
  prescription: "8 reps · hold 3 sec",
  sets: 1,
  restSeconds: 30,
  side: "Both sides",
  video: "https://www.youtube.com/shorts/D9qjQWqVIlI",
  cues: ["Gently lift the arch", "Do not curl the toes", "Keep heel, big toe and little toe grounded"],
  goal: "Wake up the foot stabilisers before court movement.",
};

const tripod: Exercise = {
  id: "tripod-hold",
  name: "Tripod single-leg hold",
  prescription: "20–30 sec each side",
  sets: 1,
  restSeconds: 30,
  side: "Both sides",
  video: "https://www.facebook.com/JoeOsteopath/videos/2971402579877027/",
  cues: ["Use light hand support if needed", "Equal pressure through heel, big toe and little toe", "Keep the pelvis level"],
  goal: "Improve foot control, balance and force transfer.",
};

// Only supplied prescriptions are tracked. Zero sets means reference-only until clarified.
const subsequentDrJoeSessions: (Omit<DrJoeSession, "exercises"> & { exercises: (LibraryExercise & { sets: number; side?: string })[] })[] = [
  {
    id: "session-04", number: "04", title: "Wall-supported hip and trunk control",
    summary: "A side-lying control exercise combining TFL lengthening, glute activation and QL control.",
    exercises: [{
      id: "s04-wall-supported-control", name: "Wall-supported TFL / Glute / QL Control",
      prescription: "5 sets × hold 10–15 sec · both sides", sets: 5,
      cues: [
        "Perform both sides. The supplied setup describes the right side.",
        "Lie on your left side with your right hip facing the ceiling.",
        "Position yourself far enough from the wall that your right foot can just make full contact with it.",
        "Keep the right hip at approximately 90° of flexion.",
        "Bring the right foot slightly backward toward your body until just before your lower back begins to arch.",
        "Place your right hand on a foam roller.",
        "Gently lift the left side of your trunk away from the floor while reaching your right arm toward your head.",
        "If the foot is too far back, the lower back will start to arch."
      ],
      goal: "Lengthen the right TFL and QL, activate the right glute, and activate the right QL to control the pelvis and trunk.",
    }],
  },
  {
    id: "session-05", number: "05", title: "Pelvis and rib-cage breathing",
    summary: "A linked breathing drill coordinating the pelvis, hamstrings and rib cage.",
    continuation: "The linked demo supplies the breathing dose. Confirm the side-specific setup with Dr. Joe; no side is inferred here.",
    exercises: [{
      id: "s05-pelvis-rib-cage-breathing", name: "Pelvis and Rib-Cage Breathing Drill",
      prescription: "2 sets × 10 slow breaths", sets: 2,
      video: "https://www.facebook.com/reel/834211419781501",
      cues: ["Dose from Dr. Joe’s linked demo: 10 slow breaths for 2 sets.", "This is a pattern-specific drill; confirm the appropriate setup with Dr. Joe."],
      goal: "Activate the hamstring, coordinate counter-rotation through the rib cage and improve rib-cage expansion during breathing.",
    }],
  },
  {
    id: "session-06", number: "06", title: "Release, breathing and posterior-chain control",
    summary: "Verteq release, a held hip-shift breathing drill, lock clam and eccentric hamstring slides.",
    continuation: "Release dosage and side-specific setup were not supplied. Confirm them with Dr. Joe; release remains reference-only, with no set checklist.",
    exercises: [
      { id: "s06-verteq-release", name: "Psoas and Paraspinal Release · Verteq Tool", prescription: "Dosage not supplied — confirm with Dr. Joe", sets: 0, cues: [], goal: "" },
      { id: "s06-hip-shift", name: "90/90 Hip Shift", prescription: "2–3 sets × 10 deep breaths · hold rather than reps", sets: 2, video: "https://www.youtube.com/shorts/vM92OGZXH3g", cues: ["Hold rather than perform repetitions."], goal: "" },
      { id: "s06-lock-clam", name: "Lock Clam", prescription: "3 sets × 12 reps", sets: 3, video: "https://www.youtube.com/shorts/F1_dSq8vggY", cues: [], goal: "" },
      { id: "s06-hamstring-slides", name: "Eccentric Hamstring Slides · Regression", prescription: "3 sets × 10 reps", sets: 3, video: "https://www.youtube.com/watch?v=JGcxXlB6qdI", cues: [], goal: "" },
    ],
  },
  {
    id: "session-07", number: "07", title: "Add thoracic rotation",
    summary: "Side plank rotations on both sides.",
    continuation: "Continue improving ankle dorsiflexion alongside this addition; the earlier ankle drills remain in their original sessions.",
    exercises: [{ id: "s07-side-plank-rotations", name: "Side Plank Rotations", prescription: "2–3 sets × 10 reps · both sides", sets: 2, video: "https://www.youtube.com/watch?v=OMc5f_JUDUU", cues: [], goal: "Improve thoracic rotation." }],
  },
];

export const dailyDrJoeWarmup: Exercise[] = [
  { ...tibial, id: "warmup-s01-tibial-ir", prescription: "2 sets × 15 reps each side", sets: 2 },
  { ...kneeOverToe, id: "warmup-s01-knee-over-toe", prescription: "2 sets × 10 reps each side", sets: 2 },
  { id: "warmup-s01-wall-dorsiflexion", name: "Dorsiflexion mobilisation against wall", prescription: "2 sets × 10–15 reps each side", sets: 2, restSeconds: 30, side: "Both sides", video: "https://www.youtube.com/shorts/HYFeP-R0m54", cues: ["Keep the heel on the ground", "Bring the knee toward the wall", "Prioritise control on the left"], goal: "Restore ankle dorsiflexion and reduce compensation into the pelvis and lower back." },
  { id: "warmup-s01-ankle-stretch", name: "Half-kneeling ankle dorsiflexion stretch", prescription: "2 sets × 20–30 sec each side", sets: 2, restSeconds: 30, side: "Both sides", video: "https://www.youtube.com/shorts/gUltNrPPE28", cues: ["Keep the heel on the ground", "Shift forward gently", "Do not rotate the foot outward"], goal: "Improve ankle and calf mobility before court or gym work." },
  { id: "warmup-s01-hip-liftoff", name: "90/90 hip internal rotation lift-off", prescription: "2 sets × 8 reps each side", sets: 2, restSeconds: 30, side: "Both sides", video: "https://www.youtube.com/shorts/jAA1Sh2IGL4", cues: ["Use a small controlled movement", "Keep the lower back relaxed", "Rotate from the hip only"], goal: "Improve hip internal rotation for higher-intensity movement." },
  { ...shortFoot, id: "warmup-s01-short-foot", prescription: "2 sets × 10 reps each side · hold 3 sec", sets: 2 },
  { id: "warmup-s01-clamshell", name: "Clamshell", prescription: "2 sets × 12–15 reps each side", sets: 2, restSeconds: 45, side: "Both sides", video: "https://www.youtube.com/shorts/39vuP5xozsI", cues: ["Keep both feet together", "Rotate from the hip only", "Do not roll the pelvis back"], goal: "Improve glute activation and hip stability while reducing lower-back compensation." },
  { ...tripod, id: "warmup-s01-tripod-hold", prescription: "2 sets × 20–30 sec each side", sets: 2 },
  { ...kneeWall, id: "warmup-s02-knee-wall", prescription: "3 sets × 10 reps · left", sets: 3 },
  { id: "warmup-s02-glute-bridge", name: "Single-leg glute bridge", prescription: "3 sets × 8–10 reps · left · hold 2 sec", sets: 3, restSeconds: 60, side: "Left", video: "https://www.youtube.com/shorts/qB_bC7-CQjI", cues: ["Push through the left heel", "Keep the pelvis level", "Hold for 2 seconds at the top"], goal: "Improve left glute activation and pelvic stability." },
  { id: "warmup-s02-step-down", name: "Lateral step-down", prescription: "2–3 sets × 8 reps · left", sets: 2, restSeconds: 60, side: "Left", video: "https://www.youtube.com/shorts/XCJl_ju19qw", cues: ["Lower slowly", "Keep the pelvis level", "Control the movement throughout"], goal: "Improve left hip control and single-leg loading." },
  { id: "warmup-s02-split-squat", name: "Split squat · left leg forward", prescription: "2–3 sets × 8 reps", sets: 2, restSeconds: 90, side: "Left forward", video: "https://www.youtube.com/shorts/ynGQy_GOfrQ", cues: ["Allow the left leg to perform most of the work", "Keep the trunk upright", "Maintain tripod foot contact"], goal: "Improve left lower-limb strength and symmetrical loading." },
  { id: "warmup-s02-goblet-squat", name: "Goblet squat with left weight bias", prescription: "3 sets × 8 reps", sets: 3, restSeconds: 90, side: "Left bias", video: "https://www.youtube.com/shorts/ycPCpTH0QGo", cues: ["Shift slightly more body weight onto the left during the descent", "Keep both heels on the floor", "Avoid the pelvis drifting right"], goal: "Retrain a symmetrical squat pattern and reduce the right pelvic shift." },
  { id: "warmup-s03-foam-roll-tfl", name: "Foam roll TFL", prescription: "2 sets × 60–90 sec", sets: 2, restSeconds: 0, side: "Left side", video: "https://www.youtube.com/shorts/dCSN5TdsmxU", cues: [], goal: "Reduce TFL tightness and the upward pull contributing to the left hip hike." },
  { id: "warmup-s03-foam-roll-ql", name: "Foam roll quadratus lumborum", prescription: "2 sets × 60–90 sec", sets: 2, restSeconds: 0, side: "Left side", video: "https://www.youtube.com/shorts/qMtQuXl5skM", cues: [], goal: "Reduce QL tightness and improve lumbar and pelvic balance." },
  { id: "warmup-s03-tfl-stretch", name: "TFL stretch", prescription: "4–5 reps × hold 30 sec", sets: 4, restSeconds: 0, side: "Left side", video: "https://www.youtube.com/watch?v=q9ZHa9Fgblw", cues: [], goal: "Stretch the TFL and reduce the elevation of the left hip." },
  { id: "warmup-s03-ql-stretch", name: "Quadratus lumborum stretch", prescription: "4–5 reps × hold 30 sec", sets: 4, restSeconds: 0, side: "Left side", video: "https://www.youtube.com/shorts/GMyCznjjU20", cues: [], goal: "Reduce QL shortening and unnecessary pressure on the lower back." },
  { id: "warmup-s03-copenhagen-adduction", name: "Copenhagen adduction", prescription: "2–3 sets × 8–10 reps", sets: 2, restSeconds: 0, side: "Left adductor focus", video: "https://www.youtube.com/shorts/CYfcIXEA78s", cues: [], goal: "Increase activation of the left adductor group and support pelvic stability." },
  { id: "warmup-s03-side-plank", name: "Side plank", prescription: "2–3 sets · hold until fatigue", sets: 2, restSeconds: 0, side: "Right side", video: "https://www.youtube.com/shorts/sKMD_pbNm7w", cues: [], goal: "Strengthen the right QL and improve pelvic stability and control." },
];

export const workouts: Workout[] = [
  {
    id: "tennis-moderate-a",
    weekday: 0,
    day: "Monday",
    shortDay: "MON",
    type: "tennis",
    title: "Tennis · Moderate",
    duration: "60–75 min",
    intensity: "RPE 6–7",
    note: "Quality movement over extra volume. Finish with something left in the tank.",
    warmup: dailyDrJoeWarmup,
    exercises: [],
  },
  {
    id: "gym-a",
    weekday: 1,
    day: "Tuesday",
    shortDay: "TUE",
    type: "strength",
    title: "Gym A · Strength",
    duration: "25–35 min",
    intensity: "RPE ≤ 6",
    note: "Daily Dr. Joe comes first; then keep strength controlled with core and easy cardio support.",
    warmup: dailyDrJoeWarmup,
    exercises: [
      { id: "chest-press", slot: "push", name: "Chest press", prescription: "6–8 reps", sets: 2, restSeconds: 75, video: "https://www.youtube.com/watch?v=lRo9zZ7EwpM", cues: ["Stay comfortable through the back", "Smooth tempo", "No grinding reps"] },
      { id: "supported-row", slot: "pull", name: "Supported row", prescription: "8 reps", sets: 2, restSeconds: 75, video: "https://www.youtube.com/watch?v=k0cTJCfxa0Y", cues: ["Support the torso", "Keep ribs stacked", "Finish with two clean reps in reserve—minimum"] },
      { id: "cable-biceps-curl", slot: "arms", name: "Cable biceps curl", prescription: "10–12 reps", sets: 2, restSeconds: 60, cues: ["Keep the elbows still", "Use a smooth full range", "Stop with two clean reps available"] },
      { id: "hanging-leg-raises-a", slot: "abs", name: "Hanging leg raises", prescription: "15 reps · bodyweight", sets: 2, restSeconds: 60, video: "https://www.youtube.com/watch?v=Pr1ieGZ5atk", cues: ["Posteriorly tilt before lifting", "Move without swinging", "Stop if the low back takes over"], goal: "Build overall anterior core strength without loading the spine." },
      { id: "incline-treadmill-a", slot: "cardio", name: "Incline treadmill walk", prescription: "15 min · easy nasal-breathing pace", sets: 1, restSeconds: 30, video: "https://www.youtube.com/watch?v=4fN_4jD8hBY", cues: ["Keep it low intensity", "Use a slight incline only if it feels smooth", "Step off feeling better than when you started"], goal: "Add repeatable low-intensity cardio without interfering with tennis or rehab." },
    ],
  },
  {
    id: "tennis-easy",
    weekday: 2,
    day: "Wednesday",
    shortDay: "WED",
    type: "tennis",
    title: "Tennis · Technical",
    duration: "45–60 min",
    intensity: "RPE 4–5",
    note: "Do the full Dr. Joe warm-up first, then keep tennis technical and easy.",
    warmup: dailyDrJoeWarmup,
    exercises: [],
  },
  {
    id: "gym-b",
    weekday: 3,
    day: "Thursday",
    shortDay: "THU",
    type: "strength",
    title: "Gym B · Upper body",
    duration: "20–30 min",
    intensity: "RPE ≤ 6",
    note: "Daily Dr. Joe comes first; then add upper body, core and easy cardio without grinding.",
    warmup: dailyDrJoeWarmup,
    exercises: [
      { id: "incline-pushup", slot: "push", name: "Incline push-up", prescription: "8 reps", sets: 2, restSeconds: 60, video: "https://www.youtube.com/watch?v=0JUrOH--Kdk", cues: ["Choose an easy height", "Move as one unit", "Keep the lower back comfortable"] },
      { id: "lat-pulldown", slot: "pull", name: "Lat pulldown", prescription: "8 reps", sets: 2, restSeconds: 75, video: "https://www.youtube.com/watch?v=CAwf7n6Luuc", cues: ["Keep ribs stacked", "Pull without leaning back", "Leave four good reps available"] },
      { id: "rope-triceps-pressdown", slot: "arms", name: "Rope triceps pressdown", prescription: "10–12 reps", sets: 2, restSeconds: 60, cues: ["Keep the elbows close", "Separate the rope at the bottom", "Stop with two clean reps available"] },
      { id: "hanging-leg-raises-b", slot: "abs", name: "Hanging leg raises", prescription: "15 reps · bodyweight", sets: 2, restSeconds: 60, video: "https://www.youtube.com/watch?v=Pr1ieGZ5atk", cues: ["Posteriorly tilt before lifting", "Move without swinging", "Stop if the low back takes over"], goal: "Build overall anterior core strength without loading the spine." },
      { id: "incline-treadmill-b", slot: "cardio", name: "Incline treadmill walk", prescription: "15 min · easy nasal-breathing pace", sets: 1, restSeconds: 30, video: "https://www.youtube.com/watch?v=4fN_4jD8hBY", cues: ["Keep it low intensity", "Use a slight incline only if it feels smooth", "Step off feeling better than when you started"], goal: "Add repeatable low-intensity cardio without interfering with tennis or rehab." },
    ],
  },
  {
    id: "tennis-moderate-b",
    weekday: 4,
    day: "Friday",
    shortDay: "FRI",
    type: "tennis",
    title: "Tennis · Moderate",
    duration: "60–75 min",
    intensity: "RPE 6–7",
    note: "Do the full Dr. Joe warm-up first, then finish on time and protect the weekend recovery window.",
    warmup: dailyDrJoeWarmup,
    exercises: [],
  },
  {
    id: "dr-joe-maintenance",
    weekday: 5,
    day: "Saturday",
    shortDay: "SAT",
    type: "recovery",
    title: "Dr. Joe · Maintenance",
    duration: "10–15 min",
    intensity: "Very easy",
    note: "Full Dr. Joe warm-up only. Treat it as activation, not a second workout.",
    warmup: dailyDrJoeWarmup,
    exercises: [],
  },
  {
    id: "rest",
    weekday: 6,
    day: "Sunday",
    shortDay: "SUN",
    type: "rest",
    title: "Complete rest",
    duration: "All day",
    intensity: "Reset",
    note: "Do the Dr. Joe warm-up gently; otherwise keep the day restorative. A relaxed walk is optional.",
    warmup: dailyDrJoeWarmup,
    exercises: [],
  },
];

export const weekRules = [
  "One tennis session stays deliberately easy",
  "No hard tennis on consecutive days",
  "Daily checklist retains the existing Sessions 01–03 baseline; Sessions 04–07 are library-only, not confirmed cumulative or daily",
  "Core and low-intensity cardio live on gym days unless recovery says otherwise",
  "Progress only when the following morning is back to baseline",
];

export const drJoeLibrary: DrJoeSession[] = [
  {
    id: "session-01",
    number: "01",
    title: "Restore the lower-leg chain",
    summary: "Ankle dorsiflexion, tibial rotation, hip rotation, foot control and glute activation.",
    exercises: [
      {
        id: "s01-tibial-ir",
        name: "Tibial Internal Rotation Mobilisation",
        prescription: "2 sets × 15 reps each side",
        video: "https://www.youtube.com/shorts/_-6RLEBq84E",
        cues: ["Keep the foot in contact with the ground", "Slowly rotate the shin inward with control", "Do not allow the hip to rotate"],
        goal: "Improve tibial internal rotation and prepare the lower limb for walking, running and directional changes.",
      },
      {
        id: "s01-knee-over-toe",
        name: "Knee Over Toe with Tibial Internal Rotation",
        prescription: "2 sets × 10 reps each side",
        video: "https://www.youtube.com/shorts/3HucseP0VA0",
        cues: ["Bring the knee forward", "Keep the foot pointing straight", "Move slowly and with control"],
        goal: "Improve coordination between the foot, shin and knee during loading, force absorption and directional control.",
      },
      {
        id: "s01-wall-dorsiflexion",
        name: "Dorsiflexion Mobilisation Against Wall",
        prescription: "2 sets × 10–15 reps each side",
        video: "https://www.youtube.com/shorts/HYFeP-R0m54",
        cues: ["Keep the heel on the ground", "Bring the knee toward the wall", "Do not collapse inward or rotate the foot outward", "Prioritise control on the left"],
        goal: "Restore ankle dorsiflexion after Achilles surgery and reduce compensation into the pelvis and lower back.",
      },
      {
        id: "s01-ankle-stretch",
        name: "Half-Kneeling Ankle Dorsiflexion Stretch",
        prescription: "2 sets × 20–30 sec each side",
        video: "https://www.youtube.com/shorts/gUltNrPPE28",
        alternateVideo: "https://www.youtube.com/shorts/wKWAOJ4tAhM",
        cues: ["Keep the heel on the ground", "Slowly shift forward", "Do not rotate the foot outward", "Stretch gently only"],
        goal: "Improve ankle and calf mobility and shock absorption during running and tennis.",
      },
      {
        id: "s01-hip-liftoff",
        name: "90/90 Hip Internal Rotation Lift-Off",
        prescription: "2 sets × 8 reps each side",
        video: "https://www.youtube.com/shorts/jAA1Sh2IGL4",
        cues: ["Use a small, controlled movement", "Keep the lower back relaxed", "Rotate from the hip only"],
        goal: "Improve hip internal rotation and prepare the hips for higher-intensity movement.",
      },
      {
        id: "s01-short-foot",
        name: "Short Foot Exercise",
        prescription: "2 sets × 10 reps each side · hold 3 sec",
        video: "https://www.youtube.com/shorts/D9qjQWqVIlI",
        cues: ["Gently raise the arch of the foot", "Do not curl the toes", "Hold each repetition for 3 seconds"],
        goal: "Activate the foot stabilisers and improve foot stability during movement.",
      },
      {
        id: "s01-clamshell",
        name: "Clamshell",
        prescription: "2 sets × 12–15 reps each side",
        video: "https://www.youtube.com/shorts/39vuP5xozsI",
        cues: ["Keep both feet together", "Rotate from the hip only", "Do not rotate the pelvis or lower back", "Move slowly and with control"],
        goal: "Improve glute activation, hip stability and single-leg loading while reducing compensatory lower-back load.",
      },
      {
        id: "s01-tripod-hold",
        name: "Tripod Single-Leg Hold on Blocks",
        prescription: "2 sets × 20–30 sec each side",
        video: "https://www.facebook.com/JoeOsteopath/videos/2971402579877027/",
        cues: ["Use the first exercise in the video", "Support heel and forefoot on two small blocks", "Keep the arch unsupported", "Use equal pressure through heel, big toe and little toe", "Light hand support is acceptable"],
        goal: "Improve tripod foot control, balance, force absorption and transfer during tennis and running.",
      },
    ],
  },
  {
    id: "session-02",
    number: "02",
    title: "Re-centre the squat",
    summary: "Left hip internal rotation, ankle dorsiflexion, glute strength and more symmetrical loading.",
    continuation: "Continue Session 01's tibial internal rotation routine alongside these exercises. Session 02 hip rotation uses the same demo as Session 01 but a different dose and side; replacement or combination is not confirmed. The variant is retained here as reference, not added to the existing daily checklist.",
    exercises: [
      { id: "s02-hip-ir", name: "Half-Kneeling Hip Internal Rotation · Session 02 variant", prescription: "2 sets × 10 reps · left", video: "https://www.youtube.com/shorts/jAA1Sh2IGL4", cues: ["Keep the pelvis facing forward.", "Rotate from the hip rather than the lower back.", "Move slowly and under control.", "Session 01 supplies 2 sets × 8 reps each side with this same demo. Neither prescription is assumed to supersede the other."], goal: "Improve left hip internal rotation and left hip loading during squatting." },
      {
        id: "s02-knee-wall",
        name: "Knee-to-Wall Ankle Mobilisation",
        prescription: "3 sets × 10 reps · left",
        video: "https://www.youtube.com/watch?v=rvkyQc60-HA",
        cues: ["Keep the heel on the ground", "Drive the knee forward slowly", "Do not allow the foot to collapse inward"],
        goal: "Improve left ankle dorsiflexion and reduce compensation from the previous Achilles surgery.",
      },
      {
        id: "s02-glute-bridge",
        name: "Single-Leg Glute Bridge",
        prescription: "3 sets × 8–10 reps · left · hold 2 sec",
        video: "https://www.youtube.com/shorts/qB_bC7-CQjI",
        cues: ["Push through the left heel", "Keep the pelvis level", "Hold for 2 seconds at the top"],
        goal: "Improve left glute activation and pelvic stability.",
      },
      {
        id: "s02-step-down",
        name: "Lateral Step-Down",
        prescription: "2–3 sets × 8 reps · left",
        video: "https://www.youtube.com/shorts/XCJl_ju19qw",
        cues: ["Lower slowly", "Keep the pelvis level", "Control the movement throughout"],
        goal: "Improve left hip control and single-leg loading.",
      },
      {
        id: "s02-split-squat",
        name: "Split Squat · Left Leg Forward",
        prescription: "2–3 sets × 8 reps",
        video: "https://www.youtube.com/shorts/ynGQy_GOfrQ",
        cues: ["Allow the left leg to perform most of the work", "Keep the trunk upright", "Maintain tripod foot contact"],
        goal: "Improve left lower-limb strength and symmetrical loading.",
      },
      {
        id: "s02-goblet-squat",
        name: "Goblet Squat with Left Weight Bias",
        prescription: "3 sets × 8 reps",
        video: "https://www.youtube.com/shorts/ycPCpTH0QGo",
        cues: ["Shift slightly more body weight onto the left during the descent", "Keep both heels on the floor", "Avoid the pelvis drifting right"],
        goal: "Retrain a symmetrical squat pattern and reduce the right pelvic shift.",
      },
    ],
  },
  {
    id: "session-03",
    number: "03",
    title: "Rebalance the pelvis",
    summary: "Left TFL and QL release, targeted stretching, left adductor activation and right-side trunk strength.",
    continuation: "Session 03 clamshell: 2 sets × 15 reps both sides. Session 01: 2 sets × 12–15 reps each side. These are distinct supplied doses; replacement or combination is not confirmed. The Session 03 demo link is malformed and is not substituted. This variant is noted here, not added to daily completion.",
    exercises: [
      { id: "s03-foam-roll-tfl", name: "Foam Roll TFL · Left Side", prescription: "2 sets × 60–90 sec", video: "https://www.youtube.com/shorts/dCSN5TdsmxU", cues: [], goal: "Reduce TFL tightness and the upward pull contributing to the left hip hike." },
      { id: "s03-foam-roll-ql", name: "Foam Roll Quadratus Lumborum · Left Side", prescription: "2 sets × 60–90 sec", video: "https://www.youtube.com/shorts/qMtQuXl5skM", cues: [], goal: "Reduce QL tightness and improve lumbar and pelvic balance." },
      { id: "s03-tfl-stretch", name: "TFL Stretch · Left Side", prescription: "4–5 reps × hold 30 sec", video: "https://www.youtube.com/watch?v=q9ZHa9Fgblw", cues: [], goal: "Stretch the TFL and reduce the elevation of the left hip." },
      { id: "s03-ql-stretch", name: "Quadratus Lumborum Stretch · Left Side", prescription: "4–5 reps × hold 30 sec", video: "https://www.youtube.com/shorts/GMyCznjjU20", cues: [], goal: "Reduce QL shortening and unnecessary pressure on the lower back." },
      { id: "s03-copenhagen-adduction", name: "Copenhagen Adduction", prescription: "2–3 sets × 8–10 reps", video: "https://www.youtube.com/shorts/CYfcIXEA78s", cues: [], goal: "Increase activation of the left adductor group and support pelvic stability." },
      { id: "s03-side-plank", name: "Side Plank · Right Side", prescription: "2–3 sets · hold until fatigue", video: "https://www.youtube.com/shorts/sKMD_pbNm7w", cues: [], goal: "Strengthen the right QL and improve pelvic stability and control." },
    ],
  },
  ...subsequentDrJoeSessions,
];
