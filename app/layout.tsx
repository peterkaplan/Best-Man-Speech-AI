import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/form/Toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CSPostHogProvider } from './providers'
import Footer from "@/components/Footer";
import { Head } from "next/document";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Best Man Speech AI",
  description: "Craft your speech to perfection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/favicon.webp" /> 
    </Head>
    <body> 
      <Navbar />
      <CSPostHogProvider>
      {children}
      </CSPostHogProvider>
      <Footer />
      <Toaster />
      <Analytics/> 
      <SpeedInsights/>
    </body>
    <GoogleAnalytics gaId="G-XDCZZMDBEL" />
  </html>
  );
}
