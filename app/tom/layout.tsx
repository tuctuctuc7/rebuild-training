import type { Metadata, Viewport } from "next";
import "./tom.css";

const description = "Three interactive art directions for Tom Nguyen’s personal site.";

export const metadata: Metadata = {
  title: "Tom Nguyen · Three art directions",
  description,
  robots: { index: false, follow: false },
  manifest: null,
  applicationName: null,
  appleWebApp: null,
  icons: null,
  alternates: { canonical: "/tom/" },
  openGraph: { title: "Tom Nguyen · Three art directions", description, type: "website", url: "/tom/", images: [] },
  twitter: { card: "summary", title: "Tom Nguyen · Three art directions", description, images: [] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ecebe4" };

export default function TomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
