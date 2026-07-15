"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { exercisesForGroup, LibraryExercise, MuscleGroupId, muscleGroups } from "./library-data";

type Language = "en" | "vi";
type GroupFilter = MuscleGroupId | "all";

const APP_ROOT = "/recovery-library";

const copy = {
  en: {
    eyebrow: "REBUILD LIBRARY",
    title: "Dr. Joe Exercise Library",
    moves: "MOVES",
    heroKicker: "PUBLIC MOVEMENT LIBRARY",
    heroTitle: "Find the right drill fast.",
    introKicker: "PUBLIC REFERENCE",
    introTitle: "Mobility and strength drills grouped by target area.",
    introBody: "This lightweight library keeps the useful exercise demos and replaces personal rehab notes with public-friendly descriptions of what each movement trains.",
    searchLabel: "Search exercises",
    searchPlaceholder: "ankle, squat, glute…",
    all: "All",
    filterLabel: "Muscle group filters",
    showing: "Showing",
    of: "of",
    exercises: "exercises",
    group: "GROUP",
    recommendedIntensity: "Recommended intensity",
    targetArea: "Target area",
    watchDemo: "Watch demo",
    alternateDemo: "Alternate demo",
    english: "EN",
    vietnamese: "VI",
    pull: "Pull to refresh",
    release: "Release to refresh",
    refreshing: "Refreshing…",
  },
  vi: {
    eyebrow: "THƯ VIỆN REBUILD",
    title: "Thư viện bài tập Dr. Joe",
    moves: "BÀI",
    heroKicker: "THƯ VIỆN VẬN ĐỘNG CÔNG KHAI",
    heroTitle: "Tìm đúng bài thật nhanh.",
    introKicker: "TÀI LIỆU THAM KHẢO",
    introTitle: "Các bài di động và sức mạnh được nhóm theo vùng tác động.",
    introBody: "Phiên bản gọn nhẹ này giữ lại video demo hữu ích và thay ghi chú cá nhân bằng mô tả dễ hiểu cho mọi người về mục đích của từng bài.",
    searchLabel: "Tìm bài tập",
    searchPlaceholder: "cổ chân, squat, mông…",
    all: "Tất cả",
    filterLabel: "Bộ lọc nhóm cơ",
    showing: "Đang hiện",
    of: "trên",
    exercises: "bài tập",
    group: "NHÓM",
    recommendedIntensity: "Cường độ gợi ý",
    targetArea: "Vùng tác động",
    watchDemo: "Xem demo",
    alternateDemo: "Demo thay thế",
    english: "EN",
    vietnamese: "VI",
    pull: "Kéo để làm mới",
    release: "Thả để làm mới",
    refreshing: "Đang làm mới…",
  },
};

const groupCopy: Record<MuscleGroupId, Record<Language, { label: string; summary: string }>> = {
  "ankle-foot": {
    en: { label: "Ankle & Foot", summary: "Mobility, arch control and balance drills for cleaner force transfer from the ground up." },
    vi: { label: "Cổ chân & Bàn chân", summary: "Các bài tăng linh hoạt, kiểm soát vòm chân và thăng bằng để truyền lực từ mặt đất mượt hơn." },
  },
  "hip-glute": {
    en: { label: "Hip & Glute", summary: "Hip rotation and glute activation drills that support pelvis control and single-leg stability." },
    vi: { label: "Hông & Mông", summary: "Các bài xoay hông và kích hoạt mông giúp kiểm soát khung chậu và giữ ổn định khi đứng một chân." },
  },
  "lower-body-strength": {
    en: { label: "Lower-Body Strength", summary: "Strength patterns for squatting, single-leg loading and resilient lower-limb mechanics." },
    vi: { label: "Sức mạnh thân dưới", summary: "Các mẫu vận động tăng sức mạnh cho squat, chịu lực một chân và cơ chế thân dưới bền hơn." },
  },
};

const exerciseVi: Record<string, { name: string; intensity: string; description: string }> = {
  "tibial-ir": { name: "Xoay trong xương chày", intensity: "2 hiệp × 15 lần mỗi bên", description: "Tập kiểm soát xoay cẳng chân để bàn chân, cổ chân và gối phối hợp chịu lực mượt hơn khi đi, chạy và đổi hướng." },
  "knee-over-toe-ir": { name: "Gối qua mũi chân kèm xoay trong cẳng chân", intensity: "2 hiệp × 10 lần mỗi bên", description: "Kết hợp đưa gối về trước, xoay cẳng chân và giữ hướng bàn chân để hấp thụ lực với trục chuyển động tốt hơn." },
  "wall-dorsiflexion": { name: "Di động cổ chân dựa tường", intensity: "2 hiệp × 10–15 lần mỗi bên", description: "Cải thiện khả năng gập cổ chân để gối đi về trước mà vòm chân không sụp hoặc bàn chân không xoay ra ngoài." },
  "ankle-dorsiflexion-stretch": { name: "Giãn gập cổ chân tư thế nửa quỳ", intensity: "2 hiệp × 20–30 giây mỗi bên", description: "Bài giãn nhẹ cho bắp chân và cổ chân, giúp squat, chạy và di chuyển trên sân bớt bị kẹt." },
  "short-foot": { name: "Short Foot - kích hoạt vòm bàn chân", intensity: "2 hiệp × 10 lần mỗi bên · giữ 3 giây", description: "Tập các cơ nhỏ trong bàn chân để nâng và kiểm soát vòm chân mà không co quắp ngón chân." },
  "tripod-hold": { name: "Giữ thăng bằng tripod một chân trên block", intensity: "2 hiệp × 20–30 giây mỗi bên", description: "Rèn thăng bằng qua ba điểm tiếp xúc: gót, ngón cái và ngón út, giúp đứng và đổi hướng ổn định hơn." },
  "hip-ir-liftoff": { name: "Nâng xoay trong hông tư thế 90/90", intensity: "2 hiệp × 8 lần mỗi bên", description: "Tăng sức chủ động cho xoay trong hông trong biên độ nhỏ, giúp hông xoay mà không mượn chuyển động từ lưng dưới." },
  "half-kneeling-hip-ir": { name: "Xoay trong hông tư thế nửa quỳ", intensity: "2 hiệp × 10 lần mỗi bên", description: "Mở xoay trong hông trong khi giữ khung chậu yên, hữu ích trước squat, lunge và di chuyển trên sân." },
  "clamshell": { name: "Clamshell", intensity: "2 hiệp × 12–15 lần mỗi bên", description: "Tác động vào mông bên để tăng ổn định hông và giảm bù trừ từ khung chậu hoặc lưng dưới khi đứng một chân." },
  "single-leg-glute-bridge": { name: "Cầu mông một chân", intensity: "3 hiệp × 8–10 lần mỗi bên · giữ 2 giây", description: "Tăng lực đẩy của mông và kiểm soát khung chậu trong động tác duỗi hông mà không cần tải nặng." },
  "knee-to-wall": { name: "Knee-to-Wall - cổ chân chạm tường", intensity: "3 hiệp × 10 lần mỗi bên", description: "Bài kiểm tra và cải thiện gập cổ chân đơn giản, tập đưa gối về trước trong khi vẫn giữ gót chân chạm đất." },
  "lateral-step-down": { name: "Bước xuống ngang", intensity: "2–3 hiệp × 8 lần mỗi bên", description: "Rèn kiểm soát khi hạ người trên một chân, ổn định hông và hướng gối cho cầu thang, giảm tốc và đổi hướng." },
  "split-squat": { name: "Split Squat", intensity: "2–3 hiệp × 8 lần mỗi bên", description: "Tăng sức mạnh thân dưới ở tư thế so le, đồng thời thử thách thăng bằng, kiểm soát hông và chịu lực đều hai bên." },
  "goblet-squat": { name: "Goblet Squat", intensity: "3 hiệp × 8 lần", description: "Biến thể squat ôm tạ trước ngực giúp củng cố mẫu squat cân bằng, thân người thẳng và sức mạnh thân dưới có kiểm soát." },
};

function localizeExercise(exercise: LibraryExercise, language: Language) {
  const vi = exerciseVi[exercise.id];
  return language === "vi" && vi ? { ...exercise, ...vi } : exercise;
}

function ExerciseCard({ exercise, language }: { exercise: LibraryExercise; language: Language }) {
  const [open, setOpen] = useState(false);
  const text = copy[language];
  const translated = localizeExercise(exercise, language);
  const target = groupCopy[exercise.group][language];

  return (
    <article className={`library-exercise ${open ? "is-open" : ""}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="exercise-letter">{translated.name.slice(0, 1)}</span>
        <span className="library-exercise-copy">
          <strong>{translated.name}</strong>
          <small>{translated.intensity}</small>
        </span>
        <span className="chevron" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="library-exercise-detail">
          <p className="exercise-description">{translated.description}</p>
          <div className="exercise-meta-grid">
            <div><span>{text.recommendedIntensity}</span><strong>{translated.intensity}</strong></div>
            <div><span>{text.targetArea}</span><strong>{target.label}</strong></div>
          </div>
          <div className="library-video-links">
            <a className="video-link" href={exercise.video} target="_blank" rel="noreferrer">{text.watchDemo} <span aria-hidden="true">↗</span></a>
            {exercise.alternateVideo && <a className="video-link" href={exercise.alternateVideo} target="_blank" rel="noreferrer">{text.alternateDemo} <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      )}
    </article>
  );
}

export function TrainingApp({ language = "en" }: { language?: Language }) {
  const text = copy[language];
  const [activeGroup, setActiveGroup] = useState<GroupFilter>("all");
  const [query, setQuery] = useState("");
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showStatusScrim, setShowStatusScrim] = useState(false);
  const pullStart = useRef<number | null>(null);
  const pullAmount = useRef(0);
  const canPull = useRef(false);
  const hapticFired = useRef(false);
  const hapticLabel = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register(`${APP_ROOT}/sw.js`, { scope: `${APP_ROOT}/` }).catch(() => undefined);
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

  const allExercises = useMemo(() => muscleGroups.flatMap((group) => exercisesForGroup(group.id)), []);
  const filteredGroups = muscleGroups.map((group) => {
    const exercises = exercisesForGroup(group.id).filter((exercise) => {
      const text = `${exercise.name} ${exercise.description} ${exercise.intensity}`.toLowerCase();
      const matchesSearch = !query.trim() || text.includes(query.trim().toLowerCase());
      return matchesSearch && (activeGroup === "all" || activeGroup === group.id);
    });
    return { ...group, exercises };
  }).filter((group) => group.exercises.length > 0);
  const visibleCount = filteredGroups.reduce((sum, group) => sum + group.exercises.length, 0);
  const pullProgress = Math.min(100, (pullDistance / 72) * 100);

  return (
    <main className="app-shell public-library-shell">
      <div className={`status-bar-scrim${showStatusScrim ? " visible" : ""}`} aria-hidden="true" />
      <div
        className={`pull-refresh${pullDistance > 0 || isRefreshing ? " visible" : ""}${pullDistance >= 72 ? " armed" : ""}${isRefreshing ? " refreshing" : ""}`}
        style={{ transform: `translate(-50%, ${Math.min(pullDistance, 72) - 72}px)` }}
        role="status"
        aria-live="polite"
      >
        <svg className="refresh-spinner" viewBox="0 0 18 18" aria-hidden="true">
          <circle className="refresh-track" cx="9" cy="9" r="7" pathLength="100" />
          <circle className="refresh-progress" cx="9" cy="9" r="7" pathLength="100" strokeDasharray={isRefreshing ? "72 28" : "100 0"} strokeDashoffset={isRefreshing ? 0 : 100 - pullProgress} />
        </svg>
        {isRefreshing ? text.refreshing : pullDistance >= 72 ? text.release : text.pull}
      </div>
      <div className="haptic-trigger" aria-hidden="true">
        <input id="refresh-haptic" type="checkbox" tabIndex={-1} {...{ switch: "" }} />
        <label ref={hapticLabel} htmlFor="refresh-haptic">Refresh threshold</label>
      </div>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand-mark" aria-hidden="true"><span /></div>
        <div><p className="eyebrow">{text.eyebrow}</p><h1>{text.title}</h1></div>
        <nav className="language-switcher" aria-label="Language switcher">
          <a className={language === "en" ? "active" : ""} href={`${APP_ROOT}/`}>{text.english}</a>
          <a className={language === "vi" ? "active" : ""} href={`${APP_ROOT}/vn/`}>{text.vietnamese}</a>
        </nav>
      </header>

      <section className="hero-art library-hero" role="img" aria-label="Exercise library cover image">
        <div><span>{text.heroKicker}</span><strong>{text.heroTitle}</strong></div>
      </section>

      <section className="library-intro">
        <p className="eyebrow">{text.introKicker}</p>
        <h2>{text.introTitle}</h2>
        <p>{text.introBody}</p>
      </section>

      <section className="library-controls" aria-label="Filter exercises">
        <label className="search-box">
          <span>{text.searchLabel}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.searchPlaceholder} />
        </label>
        <div className="group-filter" role="tablist" aria-label={text.filterLabel}>
          <button className={activeGroup === "all" ? "active" : ""} onClick={() => setActiveGroup("all")}>{text.all}</button>
          {muscleGroups.map((group) => <button key={group.id} className={activeGroup === group.id ? "active" : ""} onClick={() => setActiveGroup(group.id)}>{groupCopy[group.id][language].label}</button>)}
        </div>
      </section>

      <section className="library-count" aria-live="polite">
        {text.showing} <strong>{visibleCount}</strong> {text.of} <strong>{allExercises.length}</strong> {text.exercises}
      </section>

      <div className="library-sessions">
        {filteredGroups.map((group) => {
          const localizedGroup = groupCopy[group.id][language];
          return (
          <section className="library-session muscle-group-section" key={group.id}>
            <header>
              <div className="session-number"><small>{text.group}</small><strong>{String(group.exercises.length).padStart(2, "0")}</strong></div>
              <div><h3>{localizedGroup.label}</h3><p>{localizedGroup.summary}</p></div>
            </header>
            <div className="library-exercise-list">{group.exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} language={language} />)}</div>
          </section>
          );
        })}
      </div>
    </main>
  );
}
