import Link from "next/link";

export const dynamic = "force-static";

const concepts = [
  {
    number: "01",
    href: "/tom/signal/",
    name: "Signal",
    posture: "Strongest fit",
    summary: "A cinematic, high-contrast identity system that turns Tom’s working life into a live transmission.",
  },
  {
    number: "02",
    href: "/tom/editorial/",
    name: "Unfiltered",
    posture: "Conservative",
    summary: "A sharp editorial biography: oversized type, honest portraiture and the confidence to leave space alone.",
  },
  {
    number: "03",
    href: "/tom/field-notes/",
    name: "Field Notes",
    posture: "Divergent",
    summary: "A playful personal operating system built from channels, notes and the places where the work actually happens.",
  },
] as const;

export default function TomConceptIndex() {
  return (
    <main className="tom-site tom-index">
      <header className="tom-index-header">
        <Link href="/tom/" className="tom-index-brand">TN/26</Link>
        <span>Art direction review · private staging</span>
      </header>
      <section className="tom-index-intro">
        <p className="tom-kicker">Not a portfolio. Definitely not a funnel.</p>
        <h1>Three ways in.<br />Pick the one that feels most like Tom.</h1>
        <p>Same person, same public facts, three materially different visual and interaction systems. Open each one on desktop and mobile before choosing.</p>
      </section>
      <section className="tom-concept-grid" aria-label="Personal site art directions">
        {concepts.map((concept) => (
          <Link className={`tom-concept-card concept-${concept.number}`} href={concept.href} key={concept.number}>
            <div className="tom-concept-card-top"><span>Concept {concept.number}</span><span>{concept.posture}</span></div>
            <div className="tom-concept-preview" aria-hidden="true"><i /><i /><i /></div>
            <div className="tom-concept-card-copy"><h2>{concept.name}</h2><p>{concept.summary}</p><strong>Enter direction <span>↗</span></strong></div>
          </Link>
        ))}
      </section>
      <footer className="tom-index-footer"><span>Prepared for Tom Nguyen</span><span>July 2026</span></footer>
    </main>
  );
}
