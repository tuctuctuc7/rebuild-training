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
