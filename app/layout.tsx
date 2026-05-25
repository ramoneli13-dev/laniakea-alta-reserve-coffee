import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://laniakeacoffeee.com"),
  title: "Laniakea Alta Reserve Coffee",
  description:
    "Premium Colombian coffee from Gramalote, Norte de Santander, Colombia, crafted for California and the United States.",
  openGraph: {
    title: "Laniakea Alta Reserve Coffee",
    description:
      "Premium Colombian coffee from Gramalote, Norte de Santander, Colombia, crafted for California and the United States.",
    url: "https://laniakeacoffeee.com",
    siteName: "Laniakea Alta Reserve Coffee",
    images: [
      {
        url: "/images/laniakea-cover.jpg",
        width: 1920,
        height: 1080,
        alt: "Laniakea Alta Reserve Coffee premium Colombian coffee cover artwork"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Laniakea Alta Reserve Coffee",
    description:
      "Premium Colombian coffee from Gramalote, Norte de Santander, Colombia, crafted for California and the United States.",
    images: ["/images/laniakea-cover.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
