"use client";

import { useEffect, useId, useRef, useState } from "react";
import { drJoeLibrary, DrJoeSession, LibraryExercise } from "./training-data";
import { muscleAreas } from "./library-areas";
import "./library-only.css";

function LibraryExerciseCard({ exercise, index }: { exercise: LibraryExercise; index: number }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  return (
    <article data-exercise-id={exercise.id} className={`library-exercise ${open ? "is-open" : ""}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={detailId}>
        <span className="library-order">{String(index + 1).padStart(2, "0")}</span>
        <span className="library-exercise-copy"><strong>{exercise.name}</strong><small>{exercise.prescription}</small></span>
        <span className="chevron" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div id={detailId} className="library-exercise-detail">
          <ul className="cue-list">{exercise.cues.map((cue) => <li key={cue}>{cue}</li>)}</ul>
          {exercise.goal && <p className="exercise-goal">Why: {exercise.goal}</p>}
          <div className="library-video-links">
            {exercise.video && <a className="video-link" href={exercise.video} target="_blank" rel="noreferrer">Watch Dr. Joe demo <span aria-hidden="true">↗</span></a>}
            {exercise.alternateVideo && <a className="video-link" href={exercise.alternateVideo} target="_blank" rel="noreferrer">Watch alternate demo <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      )}
    </article>
  );
}

function SessionInfo({ session }: { session: DrJoeSession }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <>
    <button type="button" className="session-info-button" aria-label={`About session ${session.number}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><span aria-hidden="true">ⓘ</span></button>
    <div id={id} hidden={!open} className="session-info">
      <p>{session.summary}</p>
      {session.continuation && <p>{session.continuation}</p>}
    </div>
  </>;
}

const entries = drJoeLibrary.flatMap(session => session.exercises.map(exercise => ({ exercise, session })));
const tabs = [{ id: "session", label: "By session" }, { id: "area", label: "By muscle area" }] as const;
type Grouping = typeof tabs[number]["id"];

export function TrainingApp() {
  const [grouping, setGrouping] = useState<Grouping>("session");
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showStatusScrim, setShowStatusScrim] = useState(false);
  const pullStart = useRef<number | null>(null);
  const pullAmount = useRef(0);
  const canPull = useRef(false);
  const hapticFired = useRef(false);
  const hapticLabel = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/get-fit/sw.js", { scope: "/get-fit/" }).catch(() => undefined);
  }, []);

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

  const pullProgress = Math.min(100, (pullDistance / 72) * 100);
  return <main className="app-shell library-only-shell">
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
      </header>

      <div className="hero-art" role="img" aria-label="Tennis player returning to court at sunrise">
        <div><span>BUILD CAPACITY</span><strong>Move well.<br />Recover better.</strong></div>
      </div>
    <section className="screen library-screen">
      <div className="page-heading"><p className="eyebrow">DR. JOE LIBRARY · SESSIONS 01–07</p><h2>Your exercise library.</h2><p>27 exercises. Browse by session or muscle area. Tap an exercise for its supplied prescription, cues and demos.</p></div>
      <div className="library-tabs" role="tablist" aria-label="Browse library">
        {tabs.map((tab, index) => <button key={tab.id} id={`tab-${tab.id}`} type="button" role="tab" aria-selected={grouping === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={grouping === tab.id ? 0 : -1} onClick={() => setGrouping(tab.id)} onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + 1) % tabs.length;
          setGrouping(tabs[next].id);
          document.getElementById(`tab-${tabs[next].id}`)?.focus();
        }}>{tab.label}</button>)}
      </div>
      <div role="tabpanel" id={`panel-${grouping}`} aria-labelledby={`tab-${grouping}`} tabIndex={0}>
        {grouping === "session" ? <div className="library-sessions">
          {drJoeLibrary.map(session => <section className="library-session" key={session.id}>
            <header><div className="session-number"><small>SESSION</small><strong>{session.number}</strong></div><h3>{session.title}</h3><SessionInfo session={session} /></header>
            <div className="library-exercise-list">{session.exercises.map((exercise, index) => <LibraryExerciseCard key={exercise.id} exercise={exercise} index={index} />)}</div>
          </section>)}
        </div> : <>
          <p className="area-explainer">Areas follow the exercise names and supplied goals. An exercise can appear in more than one area; it is the same reference, not an extra prescription.</p>
          <div className="library-sessions">{muscleAreas.map(area => <section className="library-session" key={area.id}>
            <header><div><h3>{area.label}</h3><p>{area.basis}</p></div></header>
            <div className="library-exercise-list">{area.exerciseIds.map((id, index) => {
              const entry = entries.find(item => item.exercise.id === id)!;
              return <div key={id} className="area-entry"><p className="source-session">Session {entry.session.number} · {entry.session.title}</p><LibraryExerciseCard exercise={entry.exercise} index={index} /><div className="area-source-info"><span>Session notes</span><SessionInfo session={entry.session} /></div></div>;
            })}</div>
          </section>)}</div>
        </>}
      </div>
    </section>
  </main>;
}
