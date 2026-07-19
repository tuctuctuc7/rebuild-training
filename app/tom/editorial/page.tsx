import type { Metadata } from "next";
import { EditorialConcept } from "../concepts";

export const dynamic = "force-static";
const title = "Direction 02 · Unfiltered · Tom Nguyen";
const description = "A bold editorial personal-site direction for Tom Nguyen.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tom/editorial/" },
  openGraph: { title, description, type: "website", url: "/tom/editorial/", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function EditorialPage() { return <EditorialConcept />; }
