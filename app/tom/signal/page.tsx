import type { Metadata } from "next";
import { SignalConcept } from "../concepts";

export const dynamic = "force-static";
const title = "Direction 01 · Signal · Tom Nguyen";
const description = "A cinematic, high-contrast personal-site direction for Tom Nguyen.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tom/signal/" },
  openGraph: { title, description, type: "website", url: "/tom/signal/", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function SignalPage() { return <SignalConcept />; }
