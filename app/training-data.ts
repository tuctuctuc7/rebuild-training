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
  exercises: Exercise[];
};

export type LibraryExercise = {
  id: string;
  name: string;
  prescription: string;
  video: string;
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

const tennisPrimer = [tibial, kneeOverToe, kneeWall, shortFoot, tripod];

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
    exercises: [],
  },
  {
    id: "dr-joe-a",
    weekday: 1,
    day: "Tuesday",
    shortDay: "TUE",
    type: "recovery",
    title: "Dr. Joe · Mobility & control",
    duration: "25–35 min",
    intensity: "Controlled",
    note: "This is your osteopathic session. Move slowly and stop before the pelvis shifts right.",
    exercises: [
      {
        id: "hip-ir-left-a", name: "Half-kneeling hip rotation", prescription: "10 reps", sets: 2, restSeconds: 30, side: "Left",
        video: "https://www.youtube.com/shorts/jAA1Sh2IGL4", cues: ["Keep the pelvis facing forward", "Rotate from the hip—not the lower back", "Slow and controlled"], goal: "Improve left hip loading.",
      },
      { ...kneeWall, id: "knee-wall-left-a", sets: 2 },
      {
        id: "goblet-squat", name: "Goblet squat · left bias", prescription: "8 reps", sets: 2, restSeconds: 90, side: "Left bias",
        video: "https://www.youtube.com/shorts/ycPCpTH0QGo", cues: ["Use a 3-second descent", "Keep both heels grounded", "Stay centred; stop before the pelvis drifts right"], goal: "Retrain a symmetrical squat pattern.",
      },
      {
        id: "single-glute-bridge", name: "Single-leg glute bridge", prescription: "8 reps · hold 2 sec", sets: 3, restSeconds: 60, side: "Left",
        video: "https://www.youtube.com/shorts/qB_bC7-CQjI", cues: ["Push through the left heel", "Keep the pelvis level", "Own the top position"], goal: "Rebuild left glute strength and pelvic stability.",
      },
    ],
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
    note: "A separate session from Dr. Joe's routine. Leave four good reps available and never grind.",
    exercises: [
      { id: "supported-row", name: "Supported row", prescription: "8 reps", sets: 2, restSeconds: 75, video: "https://www.youtube.com/watch?v=k0cTJCfxa0Y", cues: ["Support the torso", "Keep ribs stacked", "Finish with two clean reps in reserve—minimum"] },
      { id: "chest-press", name: "Chest press", prescription: "6–8 reps", sets: 2, restSeconds: 75, video: "https://www.youtube.com/watch?v=lRo9zZ7EwpM", cues: ["Stay comfortable through the back", "Smooth tempo", "No grinding reps"] },
      { id: "pallof", name: "Pallof press", prescription: "8 reps each side", sets: 2, restSeconds: 45, side: "Both sides", video: "https://www.youtube.com/watch?v=axgv7H_VQOo", cues: ["Keep the pelvis square", "Exhale as the hands move away", "Resist rotation"] },
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
    note: "This session must feel easy. Reduce movement volume before sacrificing technique.",
    exercises: [],
  },
  {
    id: "dr-joe-b",
    weekday: 3,
    day: "Thursday",
    shortDay: "THU",
    type: "recovery",
    title: "Dr. Joe · Strength & control",
    duration: "25–35 min",
    intensity: "Controlled",
    note: "This is the second osteopathic session. Prioritise clean left-leg control over range or load.",
    exercises: [
      { ...tibial, id: "tibial-ir-b", sets: 2 },
      {
        id: "hip-ir-left-b", name: "Half-kneeling hip rotation", prescription: "10 reps", sets: 2, restSeconds: 30, side: "Left",
        video: "https://www.youtube.com/shorts/jAA1Sh2IGL4", cues: ["Pelvis faces forward", "Rotate from the hip only", "Keep the lower back quiet"], goal: "Maintain left hip internal rotation.",
      },
      {
        id: "lateral-step-down", name: "Lateral step-down", prescription: "8 reps", sets: 2, restSeconds: 60, side: "Left",
        video: "https://www.youtube.com/shorts/XCJl_ju19qw", cues: ["Lower slowly", "Keep the pelvis level", "Control the knee over the foot"], goal: "Improve left hip control in single-leg loading.",
      },
      {
        id: "split-squat", name: "Split squat · left forward", prescription: "8 reps", sets: 2, restSeconds: 90, side: "Left forward",
        video: "https://www.youtube.com/shorts/ynGQy_GOfrQ", cues: ["Let the left leg do most of the work", "Keep the trunk upright", "Maintain tripod foot pressure"], goal: "Rebuild left lower-limb strength.",
      },
      {
        id: "clamshell", name: "Clamshell", prescription: "12 reps each side", sets: 2, restSeconds: 45, side: "Both sides",
        video: "https://www.youtube.com/shorts/39vuP5xozsI", cues: ["Keep the feet together", "Do not roll the pelvis back", "Rotate from the hip"], goal: "Improve glute activation and hip stability.",
      },
      { ...tripod, id: "tripod-hold-b", sets: 2 },
    ],
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
    note: "Keep this separate from Dr. Joe's session. No heavy pulls, jumping or sprinting in this phase.",
    exercises: [
      { id: "lat-pulldown", name: "Lat pulldown", prescription: "8 reps", sets: 2, restSeconds: 75, video: "https://www.youtube.com/watch?v=CAwf7n6Luuc", cues: ["Keep ribs stacked", "Pull without leaning back", "Leave four good reps available"] },
      { id: "incline-pushup", name: "Incline push-up", prescription: "8 reps", sets: 2, restSeconds: 60, video: "https://www.youtube.com/watch?v=0JUrOH--Kdk", cues: ["Choose an easy height", "Move as one unit", "Keep the lower back comfortable"] },
      { id: "pallof-b", name: "Pallof press", prescription: "8 reps each side", sets: 2, restSeconds: 45, side: "Both sides", video: "https://www.youtube.com/watch?v=axgv7H_VQOo", cues: ["Keep the pelvis square", "Exhale as the hands move away", "Resist rotation"] },
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
    note: "Finish on time and protect the weekend recovery window. No extra match play for the first two weeks.",
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
    note: "A short maintenance series only. It should give energy back, not feel like another workout.",
    exercises: tennisPrimer,
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
    note: "No catch-up work. A relaxed walk is optional; rehab is not required today.",
    exercises: [],
  },
];

export const weekRules = [
  "One tennis session stays deliberately easy",
  "No hard tennis on consecutive days",
  "Dr. Joe exercises and gym are separate sessions",
  "One complete rest day—no catch-up work",
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
    continuation: "Continue Session 01's tibial internal rotation routine alongside these exercises.",
    exercises: [
      {
        id: "s02-hip-ir",
        name: "Half-Kneeling Hip Internal Rotation Mobilisation",
        prescription: "2 sets × 10 reps · left",
        video: "https://www.youtube.com/shorts/jAA1Sh2IGL4",
        cues: ["Keep the pelvis facing forward", "Rotate from the hip rather than the lower back", "Move slowly and under control"],
        goal: "Improve left hip internal rotation and left hip loading during squatting.",
      },
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
];
