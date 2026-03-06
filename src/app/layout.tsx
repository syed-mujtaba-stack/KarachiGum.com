import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KarachiGum.com | Premium Industrial Guar Gum Supplier",
  description: "Global leaders in industrial chemical supply. Providing premium quality Guar Gum and industrial solutions worldwide.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatTrigger } from "@/components/layout/ChatTrigger";
import { MobileNav } from "@/components/layout/MobileNav";
import { LaboratoryLoading } from "@/components/layout/LaboratoryLoading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LaboratoryLoading />
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0"> {/* Add padding for mobile nav */}
          {children}
        </main>
        <ChatTrigger />
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}

