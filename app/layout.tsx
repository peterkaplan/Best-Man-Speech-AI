import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/form/Toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CSPostHogProvider } from './providers'
import PostHogPageView from '@/components/PostHogPageView'
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import JsonLd from '@/components/JsonLd'
import {
  organizationSchema,
  webSiteSchema,
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
} from '@/lib/schema'

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Man Speech AI — Write Your Speech in Minutes",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // "./" resolves to the current route against metadataBase, so every page gets
  // a self-referential canonical unless it declares its own.
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: "Best Man Speech AI — Write Your Speech in Minutes",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Man Speech AI — Write Your Speech in Minutes",
    description: SITE_DESCRIPTION,
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
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <Navbar />
        <CSPostHogProvider>
          <PostHogPageView />
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
