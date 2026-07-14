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
    day: "Monday",
    shortDay: "MON",
    type: "tennis",
    title: "Tennis · Moderate",
    duration: "60–75 min",
    intensity: "RPE 6–7",
    note: "Quality movement over extra volume. Finish with something left in the tank.",
    exercises: tennisPrimer,
  },
  {
    id: "gym-a",
    day: "Tuesday",
    shortDay: "TUE",
    type: "strength",
    title: "Gym A · Strength & symmetry",
    duration: "35–45 min",
    intensity: "RPE ≤ 6",
    note: "Leave four good reps available. Stop a set when the pelvis shifts right.",
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
      { id: "supported-row", name: "Supported row", prescription: "8 reps", sets: 2, restSeconds: 75, cues: ["Support the torso", "Keep ribs stacked", "Finish with two clean reps in reserve—minimum"] },
      { id: "chest-press", name: "Chest press", prescription: "6–8 reps", sets: 2, restSeconds: 75, cues: ["Stay comfortable through the back", "Smooth tempo", "No grinding reps"] },
      { id: "pallof", name: "Pallof press", prescription: "8 reps each side", sets: 2, restSeconds: 45, side: "Both sides", cues: ["Keep the pelvis square", "Exhale as the hands move away", "Resist rotation"] },
    ],
  },
  {
    id: "tennis-easy",
    day: "Wednesday",
    shortDay: "WED",
    type: "tennis",
    title: "Tennis · Technical",
    duration: "45–60 min",
    intensity: "RPE 4–5",
    note: "This session must feel easy. Reduce movement volume before sacrificing technique.",
    exercises: tennisPrimer,
  },
  {
    id: "gym-b",
    day: "Thursday",
    shortDay: "THU",
    type: "strength",
    title: "Gym B · Control & robustness",
    duration: "35–40 min",
    intensity: "RPE ≤ 6",
    note: "Clean single-leg control. No heavy pulls, jumping or sprinting in this phase.",
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
      { id: "lat-pulldown", name: "Lat pulldown", prescription: "8 reps", sets: 2, restSeconds: 75, cues: ["Keep ribs stacked", "Pull without leaning back", "Leave four good reps available"] },
      { id: "incline-pushup", name: "Incline push-up", prescription: "8 reps", sets: 2, restSeconds: 60, cues: ["Choose an easy height", "Move as one unit", "Keep the lower back comfortable"] },
      { ...tripod, id: "tripod-hold-b", sets: 2 },
    ],
  },
  {
    id: "recovery",
    day: "Friday",
    shortDay: "FRI",
    type: "recovery",
    title: "Restore · Mobility & walk",
    duration: "10–15 min",
    intensity: "Very easy",
    note: "This should give energy back. Add an easy 20–30 minute walk only if it feels restorative.",
    exercises: [
      { ...kneeWall, id: "knee-wall-friday", prescription: "10 reps", sets: 2 },
      {
        id: "ankle-stretch", name: "Half-kneeling ankle stretch", prescription: "20–30 sec", sets: 2, restSeconds: 30, side: "Both sides",
        video: "https://www.youtube.com/watch?v=2B9x5pQJY7M", cues: ["Keep the heel grounded", "Shift forward gently", "Do not rotate the foot outward"], goal: "Improve ankle and calf mobility without irritation.",
      },
      {
        id: "hip-ir-friday", name: "Half-kneeling hip rotation", prescription: "8–10 reps", sets: 2, restSeconds: 30, side: "Left",
        video: "https://www.youtube.com/shorts/jAA1Sh2IGL4", cues: ["Keep the pelvis forward", "Rotate from the hip", "Use an easy range"], goal: "Maintain the left hip range gained this week.",
      },
      { ...shortFoot, id: "short-foot-friday", sets: 2 },
    ],
  },
  {
    id: "tennis-moderate-b",
    day: "Saturday",
    shortDay: "SAT",
    type: "tennis",
    title: "Tennis · Moderate",
    duration: "60–75 min",
    intensity: "RPE 6–7",
    note: "No extra match play for the first two weeks. Protect Monday by finishing on time.",
    exercises: tennisPrimer,
  },
  {
    id: "rest",
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
  "One complete rest day—no catch-up work",
  "Progress only when the following morning is back to baseline",
];
