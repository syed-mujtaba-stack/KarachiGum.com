import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  keywords: [
    "Guar Gum",
    "Industrial Guar Gum",
    "Guar Gum Supplier",
    "Karachi Gum Industry",
    "Guar Gum Pakistan",
    "Food Grade Guar Gum",
    "Guar Powder",
    "Guar Splits",
    "Guar Meal",
    "Chemical Supplier",
    "Industrial Thickening Agents",
    "Rheology Modifiers",
    "B2B Chemical Supply",
    "Export Guar Gum",
  ],
  verification: {
    google: "3uKrNIMABv7cqkCjoFyqv2OjIWcCUfZIQyhG_2PajGw",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatTrigger } from "@/components/layout/ChatTrigger";
import { MobileNav } from "@/components/layout/MobileNav";
import { LaboratoryLoading } from "@/components/layout/LaboratoryLoading";
import { AdminSecretShortcut } from "@/components/layout/AdminSecretShortcut";

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
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>

        <LaboratoryLoading />
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0"> {/* Add padding for mobile nav */}
          {children}
        </main>
        <ChatTrigger />
        <AdminSecretShortcut />
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}

