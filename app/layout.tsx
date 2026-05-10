import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laniakea Alta Reserve Coffee",
  description:
    "Premium Colombian coffee from Gramalote, Norte de Santander, Colombia, crafted for California and the United States."
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
