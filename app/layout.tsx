import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hardenator.com"),
  title: {
    default: "Hardenator — The security OS for AI-generated code",
    template: "%s · Hardenator",
  },
  description:
    "Your AI is a brilliant pattern-matcher and a terrible security engineer. Hardenator catches what it misses — at generation time, not six weeks after you ship to production.",
  applicationName: "Hardenator",
  keywords: [
    "AI code security",
    "vibe coding",
    "Supabase RLS",
    "Lovable security",
    "Cursor security",
    "Claude Code plugin",
    "Semgrep rules",
    "AI security OS",
  ],
  authors: [{ name: "Lingesh Balasubramaniam" }],
  creator: "Lingesh Balasubramaniam",
  openGraph: {
    type: "website",
    url: "https://hardenator.com",
    title: "Hardenator — The security OS for AI-generated code",
    description:
      "Your AI writes insecure code. We catch it before you ship. Open-source rule library, cross-platform, built for vibe-coded apps.",
    siteName: "Hardenator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardenator — The security OS for AI-generated code",
    description:
      "Your AI writes insecure code. We catch it before you ship. Open-source rule library.",
    creator: "@hardenator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
