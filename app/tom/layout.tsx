import type { Metadata, Viewport } from "next";
import "./tom.css";

const title = "Tom Nguyen · Cinematic Product";
const description = "Tom Nguyen is an operator and founder building companies and products across Europe and Asia.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  manifest: null,
  applicationName: null,
  appleWebApp: null,
  icons: null,
  alternates: { canonical: "/tom/" },
  openGraph: { title, description, type: "website", url: "/tom/", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b10",
};

export default function TomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
