import type { Metadata } from "next";
import { TrainingApp } from "../library-app";

const title = "Rebuild · Thư viện bài tập Dr. Joe";
const description = "Thư viện công khai các bài vận động Dr. Joe, được nhóm theo vùng tác động với cường độ gợi ý và link demo.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  manifest: "/recovery-library/manifest.webmanifest",
  applicationName: "Rebuild Library",
  icons: { icon: "/recovery-library/icon-192.png", apple: "/recovery-library/icon-192.png" },
  alternates: { canonical: "/recovery-library/vn/", languages: { en: "/recovery-library/", vi: "/recovery-library/vn/" } },
  openGraph: { title, description, type: "website", url: "/recovery-library/vn/", images: [{ url: "/recovery-library/og.png", width: 1536, height: 1024, alt: "Rebuild — Thư viện bài tập Dr. Joe." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/recovery-library/og.png"] },
};

export default function VietnameseRecoveryLibrary() {
  return <TrainingApp language="vi" />;
}
