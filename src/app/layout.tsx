import type { Metadata } from "next";
import { Anton, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { CustomCursor } from "@/components/animations/CustomCursor";
import AgentChat from "@/components/AgentChat";

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

export const metadata: Metadata = {
  title: "YN. — Designer × Developer",
  description: "Designer and developer crafting raw, editorial digital experiences from the ground up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable} ${spaceMono.variable} font-mono bg-[#f5f0e8] text-[#0f0f0f] antialiased`}>
        <div className="page-loader" />
        <div className="noise-overlay" />
        <CustomCursor />
        <ThemeProvider>
          {children}
          <AgentChat />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0f0f0f",
                color: "#f5f0e8",
                border: "2.5px solid #0f0f0f",
                borderRadius: "0",
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.875rem",
                textTransform: "uppercase",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
