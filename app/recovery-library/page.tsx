import type { Metadata } from "next";
import { TrainingApp } from "./library-app";

const title = "Rebuild · Dr. Joe Exercise Library";
const description = "A lightweight public library of Dr. Joe movement drills grouped by target area with recommended intensity and demo links.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  manifest: "/recovery-library/manifest.webmanifest",
  applicationName: "Rebuild Library",
  icons: { icon: "/recovery-library/icon-192.png", apple: "/recovery-library/icon-192.png" },
  alternates: { canonical: "/recovery-library/", languages: { en: "/recovery-library/", vi: "/recovery-library/vn/" } },
  openGraph: { title, description, type: "website", url: "/recovery-library/", images: [{ url: "/recovery-library/og.png", width: 1536, height: 1024, alt: "Rebuild — Dr. Joe Exercise Library." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/recovery-library/og.png"] },
};

export default function RecoveryLibrary() {
  return <TrainingApp language="en" />;
}
