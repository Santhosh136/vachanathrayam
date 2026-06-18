import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Noto_Sans_Devanagari } from "next/font/google";
import { Crimson_Pro } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Vachanathrayam",
  description: "Learn Sanskrit singular, dual, and plural forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${crimsonPro.variable} ${devanagari.variable} h-full`}
    >
      <body className="min-h-screen bg-white text-gray-900 flex flex-col" style={{ fontFamily: 'var(--font-crimson-pro)' }}>
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
