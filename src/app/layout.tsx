import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neurona | Intelligent Mental Healthcare",
  description: "Neurona blends expert clinicians with helpful AI to deliver care that's precise, private, and finally fits your brain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* --- Simple Header --- */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="#hero" className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              Neurona
            </Link>
            <nav className="flex items-center gap-4">
               <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors dark:text-slate-300 dark:hover:text-emerald-500">
                How It Works
              </Link>
              <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors dark:text-slate-300 dark:hover:text-emerald-500">
                Features
              </Link>
               <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors dark:text-slate-300 dark:hover:text-emerald-500">
                FAQ
              </Link>
              <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="#join">Get Early Access</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* --- Main Page Content --- */}
        <main>{children}</main>

        {/* --- Simple Footer --- */}
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} Neurona. All rights reserved. A new chapter in mental wellness awaits.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}