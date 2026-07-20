"use client";

import { useState } from "react";

const projects = [
  ["01", "AGENTHIC", "AI-native products and experiments."],
  ["02", "TUCMEDIA", "Boutique performance and growth."],
  ["03", "RetentionUp", "Retention systems for digital businesses."],
  ["04", "HocDigital.vn", "Practical digital education."],
  ["05", "Socialmind", "Social and creator-led growth."],
  ["06", "Kursa", "An early product bet."],
] as const;

const profileCopy = {
  story: {
    title: "Built between cultures. Better at building than fitting in.",
    text: "Born in the Czech Republic to Vietnamese parents, then shaped by work across Europe and Asia. I left conventional education twice and learned by doing the work directly.",
  },
  principle: {
    title: "Business is a game. The goal is to keep playing.",
    text: "No enemies, no final score. Just another round, another useful experiment, and another chance to build the thing properly.",
  },
} as const;

type ProfileMode = keyof typeof profileCopy;

export function TomCinematicSite() {
  const [profileMode, setProfileMode] = useState<ProfileMode>("story");
  const profile = profileCopy[profileMode];

  return (
    <div className="tom-cinematic">
      <nav className="tom-nav" aria-label="Primary">
        <strong>Tom Nguyen</strong>
        <div>
          <a href="#work">Work</a>
          <a href="#profile">Profile</a>
          <a href="#notes">Notes</a>
          <a href="https://www.linkedin.com/in/tomnguyen7/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </nav>

      <header className="tom-hero">
        <div className="tom-hero-copy">
          <span className="tom-status">Currently building</span>
          <h1>Work close<br />to the edge.</h1>
          <p>I’m Tom. An operator and founder building a small portfolio of companies and products across Europe and Asia.</p>
          <div className="tom-hero-actions">
            <a className="tom-pill tom-primary" href="#work">See the work</a>
            <a className="tom-pill" href="#profile">90-second profile</a>
          </div>
        </div>
        <div className="tom-portrait" role="img" aria-label="Tom working in Kuala Lumpur">
          <div className="tom-portrait-caption"><span>Kuala Lumpur</span><span>Portfolio mode / active</span></div>
        </div>
      </header>

      <main>
        <section className="tom-section" id="work">
          <span className="tom-section-label">01 / Portfolio</span>
          <h2>Six active bets. One operating principle: stay close to the market.</h2>
          <div className="tom-portfolio">
            {projects.map(([number, name, description]) => (
              <article className="tom-work-row" key={name}>
                <small>{number}</small><h3>{name}</h3><p>{description}</p><span>Current</span>
              </article>
            ))}
          </div>
        </section>

        <section className="tom-profile" id="profile">
          <div className="tom-profile-photo" role="img" aria-label="Tom working beside the coast" />
          <div className="tom-profile-copy">
            <span className="tom-section-label">02 / Profile</span>
            <blockquote>{profile.title}</blockquote>
            <p>{profile.text}</p>
            <div className="tom-switcher" role="group" aria-label="Profile view">
              {(["story", "principle"] as const).map((mode) => (
                <button
                  className={profileMode === mode ? "active" : ""}
                  key={mode}
                  onClick={() => setProfileMode(mode)}
                  type="button"
                >
                  {mode === "story" ? "Story" : "Principle"}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="tom-section" id="notes">
          <span className="tom-section-label">03 / Notes</span>
          <h2>Public thinking, without the content machine.</h2>
          <div className="tom-ideas">
            <article className="tom-idea"><small>OPERATING SYSTEM / 01</small><h3>Business is a game. The goal is to keep playing.</h3><span>Read soon →</span></article>
            <article className="tom-idea"><small>TUCMEDIA / 02</small><h3>Boutique by design, not by accident.</h3><span>Read soon →</span></article>
            <article className="tom-idea"><small>RESPONSIBILITY / 03</small><h3>Making money feels good. Giving it away feels better.</h3><span>Read soon →</span></article>
          </div>
        </section>

        <section className="tom-section tom-contact">
          <div><span className="tom-section-label">04 / Contact</span><h2>There is no funnel. LinkedIn is enough.</h2></div>
          <a className="tom-pill tom-primary" href="https://www.linkedin.com/in/tomnguyen7/" target="_blank" rel="noreferrer">Open LinkedIn ↗</a>
        </section>
      </main>

      <footer className="tom-footer"><span>Tom Nguyen / Europe ↔ Asia</span><span>© 2026</span></footer>
    </div>
  );
}
