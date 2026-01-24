/**
 * @file layout.js
 * @description Defines the global layout structure for the website, including providers and components like LanguageDetector and Toaster.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { Inter } from "next/font/google";
import "../styles/globals.css";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

// Dynamically import BackgroundAudio as client-only
const BackgroundAudio = dynamic(() => import("@/components/BackgroundAudio/BackgroundAudio"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration (nice for social sharing)
export const metadata = {
  title: "Linh Nhi & Như Quỳnh Wedding",
  description:
    "You are invited to our Wedding | Bạn được mời đến dự đám cưới của chúng tôi.",
  openGraph: {
    title: "Linh Nhi & Như Quỳnh Wedding",
    description:
      "You are invited to our Wedding | Bạn được mời đến dự đám cưới của chúng tôi.",
    url: "https://my-wedding-invitation-website.vercel.app/",
    siteName: "Linh Nhi & Như Quỳnh Wedding",
    images: [
      {
        url: "https://my-wedding-invitation-website.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 600,
        alt: "Linh Nhi & Như Quỳnh Wedding Website",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linh Nhi & Như Quỳnh Wedding",
    description:
      "You are invited to our Wedding | Bạn được mời đến dự đám cưới của chúng tôi.",
    images: ["https://my-wedding-invitation-website.vercel.app/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" translate="no">
      <body className={inter.className}>
        {/* Component to auto-detect and manage language */}
        <LanguageDetector />
        <BackgroundAudio />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
