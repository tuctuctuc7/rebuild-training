import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = "Rebuild · Return Athletic";
const description = "A calm, load-aware weekly training companion for tennis, strength and recovery.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rebuild-athletic-tom.tuc7.chatgpt.site"),
  title,
  description,
  manifest: "/manifest.webmanifest",
  applicationName: "Rebuild",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Rebuild" },
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  openGraph: { title, description, type: "website", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Rebuild — Return athletic." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#12221b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
