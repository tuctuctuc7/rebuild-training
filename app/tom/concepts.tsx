"use client";

import Link from "next/link";
import { useState } from "react";
import { linkedinUrl, notes, projects } from "./concept-data";

function PreviewNav({ active }: { active: "signal" | "editorial" | "field-notes" }) {
  const links = [
    ["signal", "01"],
    ["editorial", "02"],
    ["field-notes", "03"],
  ] as const;
  return (
    <nav className="preview-nav" aria-label="Preview directions">
      <Link href="/tom/" className="preview-home">TN</Link>
      <div>{links.map(([slug, label]) => <Link href={`/tom/${slug}/`} className={active === slug ? "active" : ""} aria-current={active === slug ? "page" : undefined} key={slug}>{label}</Link>)}</div>
      <Link href="/tom/" className="preview-exit">All directions</Link>
    </nav>
  );
}

function ProjectRail({ mode }: { mode: "signal" | "editorial" | "notes" }) {
  return (
    <div className={`tom-projects ${mode}`}>
      {projects.map((project, index) => (
        <article key={project}><span>{String(index + 1).padStart(2, "0")}</span><strong>{project}</strong><i aria-hidden="true">↗</i></article>
      ))}
    </div>
  );
}

function AntiLead({ mode }: { mode: "signal" | "editorial" | "notes" }) {
  return (
    <section className={`anti-lead ${mode}`}>
      <span className="section-code">NO/CRM</span>
      <div><p>Looks like a lead form, right?</p><h2>Please don’t leave your contact info.</h2></div>
      <p>I won’t contact you, and then I’ll feel guilty. I’m either working my socks off or trying to push my limits on the court or in the gym.</p>
      <a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn is the exception <span>↗</span></a>
    </section>
  );
}

export function SignalConcept() {
  const [open, setOpen] = useState(false);
  return (
    <main className={`tom-site signal-site ${open ? "signal-open" : ""}`}>
      <PreviewNav active="signal" />
      <header className="signal-hero">
        <div className="signal-grid" aria-hidden="true" />
        <p className="signal-direction">Direction 01 · Signal <span>Strongest fit</span></p>
        <div className="signal-title"><span>Tom</span><strong>Nguyen</strong></div>
        <div className="signal-portrait" role="img" aria-label="Tom working with Kuala Lumpur skyline behind him"><i /><b /></div>
        <div className="signal-intro"><span>Founder · operator · third-culture kid</span><p>Building a portfolio of digital products, funded by the work that keeps me close to the market.</p></div>
        <button className="signal-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="signal-readout">
          <i aria-hidden="true" />{open ? "Close the signal" : "Open the signal"}<span>↗</span>
        </button>
        <div className="signal-readout" id="signal-readout" aria-live="polite">
          <span>TRANSMISSION / 001</span>
          <p>{open ? "Business is just a game. Forget the scorekeeping. The only goal is to keep playing." : "Incoming profile. Press to decode."}</p>
        </div>
      </header>

      <section className="signal-statement">
        <p>Quick biography / 90 seconds</p>
        <h2>I’ve never been very good at fitting in. <em>Good.</em></h2>
        <div><p>Born in the Czech Republic to Vietnamese parents. I left conventional education twice, bounced through Europe and Asia, freelanced, built businesses, nearly broke them, and kept going.</p><p>Marketing was the entry point. The real game is building a small, strange portfolio of companies and products that carry a point of view.</p></div>
      </section>

      <section className="signal-work"><header><span>ACTIVE SYSTEMS</span><h2>Things I’m building<br />and involved with.</h2></header><ProjectRail mode="signal" /></section>

      <section className="signal-notes"><header><span>PUBLIC THINKING</span><h2>Notes from inside the game.</h2></header>{notes.map((note) => <article key={note.number}><span>{note.number}</span><div><small>{note.label} · {note.tag}</small><h3>{note.title}</h3></div><i>Read soon</i></article>)}</section>
      <AntiLead mode="signal" />
      <footer className="signal-footer"><span>Tom Nguyen · Somewhere between Europe and Asia</span><a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a></footer>
    </main>
  );
}

const coverLines = [
  ["KEEP", "PLAYING."],
  ["FUCK", "FITTING IN."],
  ["BUILD", "THE ODD BET."],
] as const;

export function EditorialConcept() {
  const [line, setLine] = useState(0);
  const nextLine = () => setLine((value) => (value + 1) % coverLines.length);
  return (
    <main className="tom-site editorial-site">
      <PreviewNav active="editorial" />
      <header className="editorial-hero">
        <p className="editorial-direction">Direction 02 · Unfiltered <span>Conservative</span></p>
        <div className="editorial-masthead"><span>TOM</span><span>NGUYEN</span></div>
        <div className="editorial-image" role="img" aria-label="Black-and-white portrait of Tom Nguyen"><i>Founder<br />Operator<br />Work in progress</i></div>
        <div className="editorial-cover" aria-live="polite"><strong>{coverLines[line][0]}</strong><strong>{coverLines[line][1]}</strong></div>
        <button type="button" onClick={nextLine}>Shuffle the cover line <span>↻</span></button>
        <p className="editorial-deck">A short, honest biography of a third-culture kid who treats business as a game worth staying in.</p>
      </header>

      <section className="editorial-letter">
        <aside><span>Issue 001</span><span>July 2026</span><span>Read time 90 sec</span></aside>
        <div><p className="editorial-dropcap">Hey, I’m Tom. Czech-born, Vietnamese by blood, and never fully at home in either box.</p><p>I quit conventional education twice and went looking for the real lesson. That took me from jobs to freelancing, from Europe to Asia, and from an agency to a portfolio of ideas I’m still stubborn enough to build.</p><blockquote>Fall seven times, stand up seven. You can’t stand up without falling first.</blockquote><p>I care about useful work, direct access to the market and staying relevant. Scale is not the flex. Building something with a point of view is.</p></div>
      </section>

      <section className="editorial-work"><header><span>The current issue</span><h2>Six things on<br />my desk.</h2></header><ProjectRail mode="editorial" /></section>
      <section className="editorial-reading"><p>Marginalia / public writing</p>{notes.map((note) => <article key={note.number}><span>{note.tag}</span><h3>{note.title}</h3><i>{note.number}</i></article>)}</section>
      <AntiLead mode="editorial" />
      <footer className="editorial-footer"><strong>NO NEWSLETTER.</strong><span>No drip sequence. No calendar link.</span><a href={linkedinUrl} target="_blank" rel="noreferrer">Find me on LinkedIn ↗</a></footer>
    </main>
  );
}

const channels = [
  { id: "work", label: "Work", title: "Building the odd portfolio.", body: "Six active bets. Some are agencies, some are products, and all of them keep me close to what is changing." },
  { id: "story", label: "Story", title: "Between places, by default.", body: "Born Czech. Vietnamese roots. Built across Europe and Asia. Home is less a pin on a map and more a role I’m still figuring out." },
  { id: "off-duty", label: "Off duty", title: "Usually still competing.", body: "If I’m not working, I’m probably testing my limits on a tennis court or in the gym. Recovery is currently part of the program." },
] as const;

export function FieldNotesConcept() {
  const [channel, setChannel] = useState<(typeof channels)[number]["id"]>("work");
  const active = channels.find((item) => item.id === channel) ?? channels[0];
  return (
    <main className="tom-site notes-site">
      <PreviewNav active="field-notes" />
      <header className="notes-hero">
        <div className="notes-topline"><p>Direction 03 · Field Notes <span>Divergent</span></p><span>PERSONAL OS / BUILD 0.3</span></div>
        <div className="notes-window">
          <div className="notes-window-bar"><i /><i /><i /><span>tom.nguyen / current-channel</span></div>
          <div className="notes-photo" role="img" aria-label="Tom working by the coast" />
          <div className="notes-channel">
            <small>NOW PLAYING / {active.label.toUpperCase()}</small>
            <h1>{active.title}</h1><p>{active.body}</p>
            <div role="group" aria-label="Change the channel"><span>Change the channel</span>{channels.map((item) => <button type="button" className={channel === item.id ? "active" : ""} aria-pressed={channel === item.id} onClick={() => setChannel(item.id)} key={item.id}>{item.label}</button>)}</div>
          </div>
          <div className="notes-sticker">TOM<br />NGUYEN<span>↘</span></div>
        </div>
        <p className="notes-caption">Operator, founder, third-culture kid. Recording from somewhere between Europe and Asia.</p>
      </header>

      <section className="notes-board">
        <article className="notes-card manifesto"><span>NOTE / 01</span><h2>Business is a game.<br />The goal is to keep playing.</h2><p>No enemies. No final score. Just another round and another chance to build the thing properly.</p></article>
        <article className="notes-card portrait"><span>LIVE FEED</span><div role="img" aria-label="Tom seated with the city skyline behind him" /><p>Working my socks off, apparently.</p></article>
        <article className="notes-card coordinates"><span>ORIGIN / ROUTE</span><strong>CZ → EU → ASIA</strong><p>Never fully one thing. That turned out to be useful.</p></article>
      </section>

      <section className="notes-work"><header><span>OPEN TABS / 06</span><h2>The workbench</h2></header><ProjectRail mode="notes" /></section>
      <section className="notes-reading"><header><span>DRAFTS FOLDER</span><h2>Notes, memos, long thoughts.</h2></header><div>{notes.map((note) => <article key={note.number}><small>{note.label}</small><h3>{note.title}</h3><span>{note.tag} · {note.number}</span></article>)}</div></section>
      <AntiLead mode="notes" />
      <footer className="notes-footer"><span>END OF TRANSMISSION</span><a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn only ↗</a></footer>
    </main>
  );
}
