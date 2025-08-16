import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next"

// Static metadata used by Next.js (for SEO and auto-injected tags)
export const metadata: Metadata = {
  title: "Neocare - Caring for the Carers",
  description:
    "Neocare provides innovative, compassionate care solutions designed to support and empower carers worldwide.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Neocare - Caring for the Carers",
    description:
      "Neocare provides innovative, compassionate care solutions designed to support and empower carers worldwide.",
    url: "https://joineocare.vercel.app",
    siteName: "Neocare",
    images: [
      {
        url: "https://joineocare.vercel.app/logo.svg",
        width: 1200,
        height: 630,
        alt: "Neocare Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neocare - Caring for the Carers",
    description:
      "Neocare provides innovative, compassionate care solutions designed to support and empower carers worldwide.",
    images: ["https://joineocare.vercel.app/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Optional manual head override if you want total control or extra tags */}
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://joineocare.vercel.app" />
        {/* Avoid repeating metadata that's already in the `metadata` export */}
      </Head>
      <body className="bg-white font-circular text-gray-900">
        {children}
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  );
}
