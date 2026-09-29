import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Display: Bricolage Grotesque has the opinionated, slightly condensed
// grotesque character that keeps headlines from reading as generic SaaS.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Body: Geist is neutral and highly legible at 14-18px.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: {
    template: "%s | IEEE Week",
    default: "IEEE Week | CHRIST University Student Branch",
  },
  description:
    "Official website for IEEE Week, the multi-society event series hosted by the IEEE CHRIST University Student Branch Chapter.",
  openGraph: {
    title: "IEEE Week | CHRIST University",
    description: "Official website for IEEE Week, the multi-society event series hosted by the IEEE CHRIST University Student Branch Chapter.",
    siteName: "IEEE Week",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Week | CHRIST University",
    description: "Join the multi-society flagship event series by IEEE CHRIST University.",
  },
  keywords: ["IEEE", "CHRIST University", "Engineering", "Technology", "Events", "Student Branch"],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

import { TransitionLayout } from "@/components/ui/TransitionLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TransitionLayout>
          {children}
        </TransitionLayout>
      </body>
    </html>
  );
}
