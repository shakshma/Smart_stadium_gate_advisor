import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "CricketSense AI - Elite Cricket Video Analytics",
  description: "Next-gen video analytics for cricket powered by Google Gemini 1.5 Pro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col font-outfit">{children}</body>
    </html>
  );
}
