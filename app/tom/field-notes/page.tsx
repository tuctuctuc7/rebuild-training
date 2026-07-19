import type { Metadata } from "next";
import { FieldNotesConcept } from "../concepts";

export const dynamic = "force-static";
const title = "Direction 03 · Field Notes · Tom Nguyen";
const description = "A playful personal operating-system direction for Tom Nguyen.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tom/field-notes/" },
  openGraph: { title, description, type: "website", url: "/tom/field-notes/", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function FieldNotesPage() { return <FieldNotesConcept />; }
