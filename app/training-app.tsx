"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { drJoeLibrary, Exercise, LibraryExercise, workouts, weekRules } from "./training-data";

type Tab = "today" | "week" | "library" | "history";
type CheckIn = { energy: number; pain: number };
type Session = {
  id: string;
  workoutId: string;
  title: string;
  date: string;
  energy: number;
  pain: number;
  rpe: number;
  completed: number;
  total: number;
  recommendation: "green" | "amber" | "red";
};
type SavedState = {
  checkIns: Record<string, CheckIn>;
  progress: Record<string, Record<string, boolean[]>>;
  history: Session[];
};

const STORAGE_KEY = "rebuild-training-v1";
const EMPTY_EXERCISES: Exercise[] = [];
const defaultState: SavedState = { checkIns: {}, progress: {}, history: [] };

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function weekdayIndex(date = new Date()) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function startOfWeek(date = new Date()) {
  const start = new Date(date);
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() - weekdayIndex(start));
  return start;
}

function dateForWeekday(weekday: number, weekOffset = 0) {
  const date = startOfWeek();
  date.setDate(date.getDate() + weekday + (weekOffset * 7));
  return date;
}

function weekStartForOffset(weekOffset: number) {
  const date = startOfWeek();
  date.setDate(date.getDate() + (weekOffset * 7));
  return date;
}

function relativeWeekLabel(weekOffset: number) {
  if (weekOffset === 0) return "This week";
  if (weekOffset === -1) return "Last week";
  if (weekOffset === 1) return "Next week";
  return weekOffset < 0 ? `${Math.abs(weekOffset)} weeks ago` : `In ${weekOffset} weeks`;
}

function formatWeekRange(start: Date) {
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const startMonth = new Intl.DateTimeFormat("en", { month: "short" }).format(start).toUpperCase();
  const endMonth = new Intl.DateTimeFormat("en", { month: "short" }).format(end).toUpperCase();
  const dates = startMonth === endMonth ? `${start.getDate()}–${end.getDate()} ${startMonth}` : `${start.getDate()} ${startMonth}–${end.getDate()} ${endMonth}`;
  return `${dates} ${end.getFullYear()}`;
}

function isoWeekNumber(date = new Date()) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function readiness(energy: number, pain: number) {
  if (pain >= 5 || energy <= 1) return { level: "red" as const, title: "Recovery only", body: "Skip the planned load. Use gentle mobility or rest, and reassess tomorrow." };
  if (pain >= 3 || energy <= 2) return { level: "amber" as const, title: "Reduce by 30–50%", body: "Keep the movement quality, but cut sets, duration or court movement today." };
  return { level: "green" as const, title: "Proceed as planned", body: "Keep the session controlled and confirm you are back to baseline tomorrow morning." };
}

function formatTimer(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function ExerciseCard({ exercise, checks, onCheck, demoLabel }: { exercise: Exercise; checks: boolean[]; onCheck: (set: number, checked: boolean) => void; demoLabel: string }) {
  const [open, setOpen] = useState(false);
  const done = checks.filter(Boolean).length;
  return (
    <article className={`exercise-card ${done === exercise.sets ? "exercise-complete" : ""}`}>
      <button className="exercise-main" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="exercise-count">{done === exercise.sets ? "✓" : String(exercise.sets)}</span>
        <span className="exercise-copy">
          <span className="exercise-name">{exercise.name}</span>
          <span className="exercise-meta">{exercise.prescription}{exercise.side ? ` · ${exercise.side}` : ""}</span>
        </span>
        <span className="chevron" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="exercise-detail">
          <div className="set-row" aria-label={`Sets for ${exercise.name}`}>
            {Array.from({ length: exercise.sets }, (_, index) => (
              <label className={`set-check ${checks[index] ? "checked" : ""}`} key={index}>
                <input type="checkbox" checked={Boolean(checks[index])} onChange={(event) => onCheck(index, event.target.checked)} />
                <span>{checks[index] ? "✓" : index + 1}</span>
              </label>
            ))}
            <span className="rest-label">{exercise.restSeconds}s rest</span>
          </div>
          <ul className="cue-list">
            {exercise.cues.map((cue) => <li key={cue}>{cue}</li>)}
          </ul>
          {exercise.goal && <p className="exercise-goal">Why: {exercise.goal}</p>}
          {exercise.video && <a className="video-link" href={exercise.video} target="_blank" rel="noreferrer">{demoLabel} <span aria-hidden="true">↗</span></a>}
        </div>
      )}
    </article>
  );
}

function LibraryExerciseCard({ exercise, index }: { exercise: LibraryExercise; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`library-exercise ${open ? "is-open" : ""}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="library-order">{String(index + 1).padStart(2, "0")}</span>
        <span className="library-exercise-copy"><strong>{exercise.name}</strong><small>{exercise.prescription}</small></span>
        <span className="chevron" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="library-exercise-detail">
          <ul className="cue-list">{exercise.cues.map((cue) => <li key={cue}>{cue}</li>)}</ul>
          <p className="exercise-goal">Why: {exercise.goal}</p>
          <div className="library-video-links">
            <a className="video-link" href={exercise.video} target="_blank" rel="noreferrer">Watch Dr. Joe demo <span aria-hidden="true">↗</span></a>
            {exercise.alternateVideo && <a className="video-link" href={exercise.alternateVideo} target="_blank" rel="noreferrer">Watch alternate demo <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      )}
    </article>
  );
}

function WarmupExerciseCard({ exercise, index, checks, onCheck }: { exercise: Exercise; index: number; checks: boolean[]; onCheck: (set: number, checked: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const done = checks.filter(Boolean).length;
  const complete = done === exercise.sets;
  return (
    <article className={`library-exercise warmup-exercise ${open ? "is-open" : ""} ${complete ? "exercise-complete" : ""}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="library-order">{complete ? "✓" : String(index + 1).padStart(2, "0")}</span>
        <span className="library-exercise-copy"><strong>{exercise.name}</strong><small>{exercise.prescription}{exercise.side ? ` · ${exercise.side}` : ""}</small></span>
        <span className="chevron" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="library-exercise-detail">
          <div className="set-row" aria-label={`Sets for ${exercise.name}`}>
            {Array.from({ length: exercise.sets }, (_, setIndex) => (
              <label className={`set-check ${checks[setIndex] ? "checked" : ""}`} key={setIndex}>
                <input type="checkbox" checked={Boolean(checks[setIndex])} onChange={(event) => onCheck(setIndex, event.target.checked)} />
                <span>{checks[setIndex] ? "✓" : setIndex + 1}</span>
              </label>
            ))}
            <span className="rest-label">{exercise.restSeconds}s rest</span>
          </div>
          <ul className="cue-list">{exercise.cues.map((cue) => <li key={cue}>{cue}</li>)}</ul>
          {exercise.goal && <p className="exercise-goal">Why: {exercise.goal}</p>}
          {exercise.video && <a className="video-link" href={exercise.video} target="_blank" rel="noreferrer">Watch Dr. Joe demo <span aria-hidden="true">↗</span></a>}
        </div>
      )}
    </article>
  );
}

export function TrainingApp() {
  const todayWeekday = weekdayIndex();
  const todayIndex = Math.max(0, workouts.findIndex((item) => item.weekday === todayWeekday));
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [selectedWeekOffset, setSelectedWeekOffset] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [saved, setSaved] = useState<SavedState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [timer, setTimer] = useState<{ exercise: string; remaining: number; total: number } | null>(null);
  const [showFinish, setShowFinish] = useState(false);
  const [rpe, setRpe] = useState(6);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showStatusScrim, setShowStatusScrim] = useState(false);
  const pullStart = useRef<number | null>(null);
  const pullAmount = useRef(0);
  const canPull = useRef(false);
  const hapticFired = useRef(false);
  const hapticLabel = useRef<HTMLLabelElement | null>(null);

  const workout = workouts[selectedDay];
  const workoutDate = dateForWeekday(workout.weekday, selectedWeekOffset);
  const key = `${dateKey(workoutDate)}:${workout.id}`;
  const checkIn = saved.checkIns[key] ?? { energy: 3, pain: 1 };
  const recommendation = readiness(checkIn.energy, checkIn.pain);
  const workoutProgress = useMemo(() => saved.progress[key] ?? {}, [saved.progress, key]);

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      try {
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) setSaved(JSON.parse(local));
      } catch { /* Keep the app usable if storage is unavailable. */ }
      setHydrated(true);
    }, 0);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/get-fit/sw.js", { scope: "/get-fit/" }).catch(() => undefined);
    return () => window.clearTimeout(hydrate);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    document.documentElement.classList.toggle("standalone-app", standalone);
    if (!standalone) return;

    const refreshThreshold = 72;
    const onScroll = () => setShowStatusScrim(window.scrollY > 2);
    const triggerHaptic = () => {
      if ("vibrate" in navigator && navigator.vibrate(10)) return;
      hapticLabel.current?.click();
    };
    const resetPull = () => {
      pullStart.current = null;
      pullAmount.current = 0;
      canPull.current = false;
      hapticFired.current = false;
      setPullDistance(0);
    };
    const onTouchStart = (event: TouchEvent) => {
      canPull.current = window.scrollY <= 0 && event.touches.length === 1;
      pullStart.current = canPull.current ? event.touches[0].clientY : null;
      hapticFired.current = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!canPull.current || pullStart.current === null || window.scrollY > 0) return;
      const delta = event.touches[0].clientY - pullStart.current;
      if (delta <= 0) {
        pullAmount.current = 0;
        setPullDistance(0);
        return;
      }
      if (event.cancelable) event.preventDefault();
      const distance = Math.min(104, delta * 0.5);
      pullAmount.current = distance;
      setPullDistance(distance);
      if (distance >= refreshThreshold && !hapticFired.current) {
        hapticFired.current = true;
        triggerHaptic();
      }
    };
    const onTouchEnd = () => {
      if (!canPull.current) return;
      if (pullAmount.current >= refreshThreshold) {
        pullStart.current = null;
        canPull.current = false;
        setPullDistance(refreshThreshold);
        setIsRefreshing(true);
        window.setTimeout(() => window.location.reload(), 450);
        return;
      }
      resetPull();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", resetPull, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.documentElement.classList.remove("standalone-app");
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", resetPull);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!timer || timer.remaining <= 0) return;
    const id = window.setInterval(() => setTimer((current) => current ? { ...current, remaining: Math.max(0, current.remaining - 1) } : null), 1000);
    return () => window.clearInterval(id);
  }, [timer]);

  const warmup = workout.warmup ?? EMPTY_EXERCISES;
  const warmupTotals = useMemo(() => {
    const total = warmup.reduce((sum, exercise) => sum + exercise.sets, 0);
    const completed = warmup.reduce((sum, exercise) => sum + (workoutProgress[exercise.id] ?? []).filter(Boolean).length, 0);
    return { total, completed };
  }, [warmup, workoutProgress]);
  const warmupSessions = useMemo(() => drJoeLibrary.map((session) => {
    const exercises = warmup.filter((exercise) => exercise.id.startsWith(`warmup-s${session.number}-`));
    const total = exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
    const completed = exercises.reduce((sum, exercise) => sum + (workoutProgress[exercise.id] ?? []).filter(Boolean).length, 0);
    return { ...session, exercises, total, completed };
  }).filter((session) => session.exercises.length > 0), [warmup, workoutProgress]);
  const sessionTotals = useMemo(() => {
    const total = workout.exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
    const completed = workout.exercises.reduce((sum, exercise) => sum + (workoutProgress[exercise.id] ?? []).filter(Boolean).length, 0);
    return { total, completed };
  }, [workout.exercises, workoutProgress]);
  const totals = useMemo(() => ({
    total: warmupTotals.total + sessionTotals.total,
    completed: warmupTotals.completed + sessionTotals.completed,
  }), [sessionTotals, warmupTotals]);

  function updateCheckIn(field: keyof CheckIn, value: number) {
    setSaved((current) => ({ ...current, checkIns: { ...current.checkIns, [key]: { ...checkIn, [field]: value } } }));
  }

  function toggleSet(exercise: Exercise, set: number, checked: boolean) {
    const prior = workoutProgress[exercise.id] ?? Array(exercise.sets).fill(false);
    const next = [...prior];
    next[set] = checked;
    setSaved((current) => ({ ...current, progress: { ...current.progress, [key]: { ...workoutProgress, [exercise.id]: next } } }));
    if (checked) setTimer({ exercise: exercise.name, remaining: exercise.restSeconds, total: exercise.restSeconds });
  }

  function saveSession() {
    const session: Session = {
      id: `${workout.id}:${dateKey(workoutDate)}:${saved.history.length}`,
      workoutId: workout.id,
      title: workout.title,
      date: workoutDate.toISOString(),
      energy: checkIn.energy,
      pain: checkIn.pain,
      rpe,
      completed: totals.completed,
      total: totals.total,
      recommendation: recommendation.level,
    };
    setSaved((current) => ({ ...current, history: [session, ...current.history] }));
    setShowFinish(false);
    setActiveTab("history");
  }

  function selectWorkout(index: number, offset = weekOffset) {
    setSelectedDay(index);
    setSelectedWeekOffset(offset);
    setActiveTab("today");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const recent = saved.history.slice(0, 8);
  const averageRpe = recent.length ? (recent.reduce((sum, item) => sum + item.rpe, 0) / recent.length).toFixed(1) : "—";
  const visibleWeekStart = weekStartForOffset(weekOffset);
  const topbarDate = activeTab === "week" ? visibleWeekStart : activeTab === "today" ? workoutDate : new Date();
  const pullProgress = Math.min(100, (pullDistance / 72) * 100);

  return (
    <main className="app-shell">
      <div className={`status-bar-scrim${showStatusScrim ? " visible" : ""}`} aria-hidden="true" />
      <div
        className={`pull-refresh${pullDistance > 0 || isRefreshing ? " visible" : ""}${pullDistance >= 72 ? " armed" : ""}${isRefreshing ? " refreshing" : ""}`}
        style={{ transform: `translate(-50%, ${Math.min(pullDistance, 72) - 72}px)` }}
        role="status"
        aria-live="polite"
      >
        <svg className="refresh-spinner" viewBox="0 0 18 18" aria-hidden="true">
          <circle className="refresh-track" cx="9" cy="9" r="7" pathLength="100" />
          <circle
            className="refresh-progress"
            cx="9"
            cy="9"
            r="7"
            pathLength="100"
            strokeDasharray={isRefreshing ? "72 28" : "100 0"}
            strokeDashoffset={isRefreshing ? 0 : 100 - pullProgress}
          />
        </svg>
        {isRefreshing ? "Refreshing…" : pullDistance >= 72 ? "Release to refresh" : "Pull to refresh"}
      </div>
      <div className="haptic-trigger" aria-hidden="true">
        <input id="refresh-haptic" type="checkbox" tabIndex={-1} {...{ switch: "" }} />
        <label ref={hapticLabel} htmlFor="refresh-haptic">Refresh threshold</label>
      </div>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true"><span /></div>
        <div><p className="eyebrow">REBUILD</p><h1>Return athletic.</h1></div>
        <div className="week-chip"><span>WK</span> {String(isoWeekNumber(topbarDate)).padStart(2, "0")}</div>
      </header>

      <div className="hero-art" role="img" aria-label="Tennis player returning to court at sunrise">
        <div><span>BUILD CAPACITY</span><strong>Move well.<br />Recover better.</strong></div>
      </div>

      {activeTab === "today" && (
        <section className="screen today-screen">
          {(selectedDay !== todayIndex || selectedWeekOffset !== 0) && <button className="back-today" onClick={() => { setSelectedDay(todayIndex); setSelectedWeekOffset(0); }}>← Back to today</button>}
          <div className="day-heading">
            <div>
              <p className="eyebrow">{selectedDay === todayIndex && selectedWeekOffset === 0 ? "TODAY" : `${workout.day.toUpperCase()} · ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(workoutDate).toUpperCase()}`}</p>
              <h2>{workout.title}</h2>
            </div>
            <div className={`type-orb ${workout.type}`} aria-hidden="true"><span>{workout.type === "tennis" ? "T" : workout.type === "strength" ? "G" : workout.type === "recovery" ? "J" : "·"}</span></div>
          </div>
          <div className="session-facts"><span>{workout.duration}</span><i /><span>{workout.intensity}</span></div>
          <p className="session-note">{workout.note}</p>

          <section className="checkin-card">
            <div className="section-title"><div><p className="eyebrow">READINESS</p><h3>How are you arriving?</h3></div><span className="saved-dot">Saved</span></div>
            <div className="measure-row">
              <span className="measure-label">Energy</span>
              <div className="energy-options" role="radiogroup" aria-label="Energy from one to five">
                {[1, 2, 3, 4, 5].map((value) => <button role="radio" aria-checked={checkIn.energy === value} className={checkIn.energy === value ? "active" : ""} key={value} onClick={() => updateCheckIn("energy", value)}>{value}</button>)}
              </div>
            </div>
            <div className="measure-row pain-row">
              <label className="measure-label" htmlFor="pain">Pain <strong>{checkIn.pain}/10</strong></label>
              <input id="pain" type="range" min="0" max="10" value={checkIn.pain} onChange={(event) => updateCheckIn("pain", Number(event.target.value))} />
            </div>
            <div className={`recommendation ${recommendation.level}`}>
              <span className="signal" /><div><strong>{recommendation.title}</strong><p>{recommendation.body}</p></div>
            </div>
          </section>

          {warmup.length > 0 && (
            <section className="exercise-section warmup-section">
              <div className="section-title exercise-title">
                <div><p className="eyebrow">DAILY DR. JOE WARM-UP</p><h3>{warmupTotals.completed}/{warmupTotals.total} sets complete</h3><p>Done before tennis, gym, recovery, or rest. Session 01 + Session 02 every day.</p></div>
                <div className="progress-ring" style={{ "--progress": `${warmupTotals.total ? (warmupTotals.completed / warmupTotals.total) * 360 : 0}deg` } as React.CSSProperties}><span>{warmupTotals.total ? Math.round((warmupTotals.completed / warmupTotals.total) * 100) : 0}%</span></div>
              </div>
              <div className="today-warmup-sessions">
                {warmupSessions.map((session) => (
                  <section className="library-session today-warmup-session" key={session.id}>
                    <header>
                      <div className="session-number"><small>SESSION</small><strong>{session.number}</strong></div>
                      <div><h3>{session.title}</h3><p>{session.summary}</p></div>
                    </header>
                    <div className="warmup-session-progress" aria-label={`${session.completed} of ${session.total} sets complete`}>
                      <span>{session.completed}/{session.total} sets</span>
                      <div><i style={{ width: `${session.total ? (session.completed / session.total) * 100 : 0}%` }} /></div>
                    </div>
                    <div className="library-exercise-list">
                      {session.exercises.map((exercise, index) => <WarmupExerciseCard key={exercise.id} exercise={exercise} index={index} checks={workoutProgress[exercise.id] ?? Array(exercise.sets).fill(false)} onCheck={(set, checked) => toggleSet(exercise, set, checked)} />)}
                    </div>
                  </section>
                ))}
              </div>
            </section>
          )}

          {workout.exercises.length > 0 ? (
            <section className="exercise-section">
              <div className="section-title exercise-title">
                <div><p className="eyebrow">{workout.id.startsWith("dr-joe") ? "DR. JOE EXTRA" : "GYM SESSION"}</p><h3>{sessionTotals.completed}/{sessionTotals.total} sets complete</h3></div>
                <div className="progress-ring" style={{ "--progress": `${sessionTotals.total ? (sessionTotals.completed / sessionTotals.total) * 360 : 0}deg` } as React.CSSProperties}><span>{sessionTotals.total ? Math.round((sessionTotals.completed / sessionTotals.total) * 100) : 0}%</span></div>
              </div>
              <div className="exercise-list">
                {workout.exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} checks={workoutProgress[exercise.id] ?? Array(exercise.sets).fill(false)} onCheck={(set, checked) => toggleSet(exercise, set, checked)} demoLabel={workout.id.startsWith("gym-") ? "Watch video demo" : "Watch Dr. Joe demo"} />)}
              </div>
              <button className="finish-button" onClick={() => setShowFinish(true)}>Finish session <span>→</span></button>
            </section>
          ) : workout.type === "tennis" ? (
            <section className="court-card">
              <div className="court-lines" aria-hidden="true" />
              <p className="eyebrow">COURT SESSION</p>
              <h3>Keep the quality high.</h3>
              <p>Log your energy, pain and whole-session RPE. The target is to finish with something left.</p>
              <button className="finish-button" onClick={() => setShowFinish(true)}>Finish tennis <span>→</span></button>
            </section>
          ) : (
            <section className="rest-card"><div className="rest-sun" aria-hidden="true" /><h3>{workout.type === "recovery" ? "Warm-up is the session today." : "Recovery is the work today."}</h3><p>{workout.type === "recovery" ? "Complete the full Dr. Joe warm-up gently, then stop while it still feels like activation." : "Complete the Dr. Joe warm-up gently, then keep the rest of the day restorative."}</p></section>
          )}
        </section>
      )}

      {activeTab === "week" && (
        <section className="screen week-screen">
          <div className="page-heading"><p className="eyebrow">YOUR RHYTHM</p><h2>A week built to recover.</h2><p>Tennis runs Monday, Wednesday and Friday. The full Dr. Joe Session 01 + Session 02 warm-up happens every day before the main work.</p></div>
          <div className="week-switcher" aria-label="Choose week">
            <button onClick={() => setWeekOffset((value) => value - 1)} aria-label="Previous week">←</button>
            <div><strong>{relativeWeekLabel(weekOffset)}</strong><small>{formatWeekRange(visibleWeekStart)}</small></div>
            {weekOffset !== 0 && <button className="current-week-button" onClick={() => setWeekOffset(0)}>Today</button>}
            <button onClick={() => setWeekOffset((value) => value + 1)} aria-label="Next week">→</button>
          </div>
          <div className="week-list">
            {workouts.map((item, index) => (
              <button key={item.id} className={`week-card ${weekOffset === 0 && item.weekday === todayWeekday ? "is-today" : ""}`} onClick={() => selectWorkout(index, weekOffset)}>
                <span className="day-tile"><small>{item.shortDay}</small><strong>{dateForWeekday(item.weekday, weekOffset).getDate()}</strong></span>
                <span className="week-copy"><strong>{item.title}</strong><small>{item.duration} · {item.intensity}</small></span>
                <span className={`week-type ${item.type}`} aria-hidden="true" />
              </button>
            ))}
          </div>
          <section className="rules-card"><p className="eyebrow">NON-NEGOTIABLES</p>{weekRules.map((rule, index) => <div key={rule}><span>0{index + 1}</span><p>{rule}</p></div>)}</section>
        </section>
      )}

      {activeTab === "library" && (
        <section className="screen library-screen">
          <div className="page-heading"><p className="eyebrow">DR. JOE LIBRARY</p><h2>Your routines, in order.</h2><p>Each session follows the chronology and exercise order from Dr. Joe&apos;s emails. Tap an exercise for cues, goals and its demo.</p></div>
          <div className="library-sessions">
            {drJoeLibrary.map((session) => (
              <section className="library-session" key={session.id}>
                <header>
                  <div className="session-number"><small>SESSION</small><strong>{session.number}</strong></div>
                  <div><h3>{session.title}</h3><p>{session.summary}</p></div>
                </header>
                {session.continuation && <div className="continuation-note"><span>↳</span><p>{session.continuation}</p></div>}
                <div className="library-exercise-list">{session.exercises.map((exercise, index) => <LibraryExerciseCard key={exercise.id} exercise={exercise} index={index} />)}</div>
              </section>
            ))}
          </div>
        </section>
      )}

      {activeTab === "history" && (
        <section className="screen history-screen">
          <div className="page-heading"><p className="eyebrow">LOAD MEMORY</p><h2>Notice the pattern.</h2><p>The goal is more usable energy—not simply more completed work.</p></div>
          <div className="stat-grid"><div><span>{saved.history.length}</span><small>Sessions</small></div><div><span>{averageRpe}</span><small>Avg RPE</small></div><div><span>{recent.length ? recent[0].pain : "—"}</span><small>Last pain</small></div></div>
          {recent.length ? <div className="history-list">{recent.map((item) => <article className="history-card" key={item.id}>
            <div className={`history-signal ${item.recommendation}`} /><div className="history-main"><strong>{item.title}</strong><small>{new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(new Date(item.date))}</small></div><div className="history-score"><strong>{item.total ? `${item.completed}/${item.total}` : "—"}</strong><small>{item.total ? "sets" : "court"}</small></div><div className="history-score"><strong>{item.rpe}</strong><small>RPE</small></div>
          </article>)}</div> : <div className="empty-history"><span aria-hidden="true">↗</span><h3>Your trend starts today.</h3><p>Finish a session to save its load, pain and energy here.</p></div>}
          <section className="safety-note"><strong>Morning-after rule</strong><p>Progress only when pain is 0–2/10, your gait is normal, and energy and stiffness return to baseline by the next morning.</p></section>
        </section>
      )}

      {timer && (
        <div className={`timer-toast ${timer.remaining === 0 ? "timer-done" : ""}`} role="timer">
          <button onClick={() => setTimer(null)} aria-label="Dismiss rest timer">×</button>
          <div className="timer-copy"><small>{timer.remaining === 0 ? "REST COMPLETE" : "RESTING AFTER"}</small><strong>{timer.exercise}</strong></div>
          <span className="timer-number">{timer.remaining === 0 ? "GO" : formatTimer(timer.remaining)}</span>
        </div>
      )}

      {showFinish && (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="finish-title">
          <div className="finish-sheet"><button className="sheet-close" onClick={() => setShowFinish(false)} aria-label="Close">×</button><p className="eyebrow">SESSION CHECK-OUT</p><h2 id="finish-title">How hard was that?</h2><p>Use the whole-session effort—not the hardest single set.</p>
            <div className="rpe-value"><strong>{rpe}</strong><span>/10 RPE</span></div>
            <input aria-label="Session RPE" className="rpe-slider" type="range" min="1" max="10" value={rpe} onChange={(event) => setRpe(Number(event.target.value))} />
            <div className="rpe-labels"><span>Very easy</span><span>Maximum</span></div>
            <div className="finish-summary"><span>{totals.total ? `${totals.completed}/${totals.total} sets` : "Court session"}</span><span>Energy {checkIn.energy}/5</span><span>Pain {checkIn.pain}/10</span></div>
            <button className="finish-button" onClick={saveSession}>Save to history <span>→</span></button>
          </div>
        </div>
      )}

      <nav className="bottom-nav" aria-label="Primary">
        <button className={activeTab === "today" ? "active" : ""} onClick={() => { setSelectedDay(todayIndex); setSelectedWeekOffset(0); setActiveTab("today"); }}><span className="nav-icon">●</span><small>Today</small></button>
        <button className={activeTab === "week" ? "active" : ""} onClick={() => setActiveTab("week")}><span className="nav-icon">▦</span><small>Week</small></button>
        <button className={activeTab === "library" ? "active" : ""} onClick={() => setActiveTab("library")}><span className="nav-icon">≡</span><small>Library</small></button>
        <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}><span className="nav-icon">↗</span><small>History</small></button>
      </nav>
    </main>
  );
}
