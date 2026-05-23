import type { Metadata } from "next";
import { Anton, Space_Mono, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";
import { CustomCursor } from "@/components/animations/CustomCursor";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== 'http://localhost:3000' 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'https://portfolio-f3a7b.web.app'),
  title: {
    default: "SUYASH CHAUDHARI — Designer × Developer",
    template: "%s | SUYASH CHAUDHARI"
  },
  description: "Designer and developer crafting raw, editorial digital experiences from the ground up. Expert in React, Next.js, and Firebase.",
  keywords: ["Suyash Chaudhari", "Software Engineer", "Frontend Developer", "Web Designer", "Next.js Developer", "React Developer", "Firebase"],
  authors: [{ name: "Suyash Chaudhari", url: "https://github.com/Suyash2527" }],
  creator: "Suyash Chaudhari",
  verification: {
    google: "fscddUC9fLghIA26Y8ecpIk_JvZQSGeF3bPy0dc3kvU",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "SUYASH CHAUDHARI — Designer × Developer",
    description: "Designer and developer crafting raw, editorial digital experiences from the ground up.",
    siteName: "Suyash Chaudhari Portfolio",
    images: [{
      url: "https://firebasestorage.googleapis.com/v0/b/portfolio-f3a7b.firebasestorage.app/o/WhatsApp%20Image%202026-04-26%20at%206.58.02%20PM.jpeg?alt=media&token=642b4e94-d5fa-4e53-96a7-d580f8edd8fc",
      width: 1200,
      height: 630,
      alt: "Suyash Chaudhari"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "SUYASH CHAUDHARI — Designer × Developer",
    description: "Designer and developer crafting raw, editorial digital experiences from the ground up.",
    images: ["https://firebasestorage.googleapis.com/v0/b/portfolio-f3a7b.firebasestorage.app/o/WhatsApp%20Image%202026-04-26%20at%206.58.02%20PM.jpeg?alt=media&token=642b4e94-d5fa-4e53-96a7-d580f8edd8fc"],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
      </head>
      <body className={`${anton.variable} ${spaceMono.variable} ${ibmPlexMono.variable} font-mono bg-[var(--bg)] text-[var(--ink)] antialiased transition-colors duration-300`}>
        <div className="page-loader" />
        <div className="noise-overlay" />
        <CustomCursor />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Suyash Chaudhari",
                url: "https://portfolio-f3a7b.web.app",
                jobTitle: "Software Engineer & Designer",
                sameAs: [
                  "https://github.com/Suyash2527",
                  "https://www.linkedin.com/in/suyash-chaudhari-23768b316"
                ],
                image: "https://firebasestorage.googleapis.com/v0/b/portfolio-f3a7b.firebasestorage.app/o/WhatsApp%20Image%202026-04-26%20at%206.58.02%20PM.jpeg?alt=media&token=642b4e94-d5fa-4e53-96a7-d580f8edd8fc"
              })
            }}
          />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--ink)",
                color: "var(--bg)",
                border: "2.5px solid var(--border-color)",
                borderRadius: "0",
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.875rem",
                textTransform: "uppercase",
              },
            }}
          />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-PLACEHOLDER"} />
      </body>
    </html>
  );
}
