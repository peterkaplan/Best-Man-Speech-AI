import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/form/Toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CSPostHogProvider } from './providers'
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bestmanspeechai.com"),
  title: {
    default: "Best Man Speech AI — Write Your Speech in Minutes",
    template: "%s | Best Man Speech AI",
  },
  description: "Craft an unforgettable best man speech in minutes. Answer a few questions and let our AI turn your stories into a speech worth applauding.",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${instrumentSans.variable}`}>
      <body>
        <Navbar />
        <CSPostHogProvider>
          {children}
        </CSPostHogProvider>
        <Footer />
        <Toaster />
        <Analytics/>
        <SpeedInsights/>
        <GoogleAnalytics gaId="G-XDCZZMDBEL" />
      </body>
    </html>
  );
}
