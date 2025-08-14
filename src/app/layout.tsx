import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"; // ✅ Import Analytics

export const metadata: Metadata = {
  title: "neocare",
  description: "Caring for the carers",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white font-circular text-gray-900">
        {children}
        <Analytics /> {/* ✅ Add Analytics here */}
      </body>
    </html>
  );
}
