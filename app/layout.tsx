import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Rebuild · Return Athletic";
const description = "A calm, load-aware weekly training companion for tennis, strength and recovery.";

export const metadata: Metadata = {
  metadataBase: new URL("https://build.tomnguyen.co"),
  title,
  description,
  manifest: "/get-fit/manifest.webmanifest",
  applicationName: "Rebuild",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Rebuild" },
  icons: { icon: "/get-fit/icon-192.png", apple: "/get-fit/icon-192.png" },
  alternates: { canonical: "/get-fit" },
  openGraph: { title, description, type: "website", url: "/get-fit", images: [{ url: "/get-fit/og.png", width: 1536, height: 1024, alt: "Rebuild — Return athletic." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/get-fit/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#12221b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
