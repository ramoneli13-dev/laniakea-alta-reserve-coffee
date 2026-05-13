import type { Metadata } from "next";
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
        url: "/images/laniakea-official.png",
        width: 1024,
        height: 1536,
        alt: "Laniakea Alta Reserve Coffee official brand image"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Laniakea Alta Reserve Coffee",
    description:
      "Premium Colombian coffee from Gramalote, Norte de Santander, Colombia, crafted for California and the United States.",
    images: ["/images/laniakea-official.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
