import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neurona | AI-Powered Mental Healthcare Platform",
  description: "Revolutionary mental healthcare platform combining AI precision with human empathy. Get matched with licensed clinicians and access personalized therapy tools. Join 1,000+ early adopters.",
  keywords: "mental health, AI therapy, online therapy, mental healthcare, licensed therapists, psychiatrists, personalized therapy, HIPAA compliant",
  authors: [{ name: "Neurona Team" }],
  creator: "Neurona",
  publisher: "Neurona",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neurona.ai",
    title: "Neurona | AI-Powered Mental Healthcare Platform",
    description: "Revolutionary mental healthcare platform combining AI precision with human empathy. Get matched with licensed clinicians and access personalized therapy tools.",
    siteName: "Neurona",
    images: [
      {
        url: "/logo3.png",
        width: 1200,
        height: 630,
        alt: "Neurona - AI-Powered Mental Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurona | AI-Powered Mental Healthcare Platform",
    description: "Revolutionary mental healthcare platform combining AI precision with human empathy.",
    images: ["/logo3.png"],
    creator: "@neurona_ai",
  },
  metadataBase: new URL('https://neurona.ai'),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#059669',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo4.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo4.png" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
