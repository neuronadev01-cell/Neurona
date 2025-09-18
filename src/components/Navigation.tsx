"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-600" style={{backgroundColor: 'rgba(0, 70, 82, 0.95)'}}>
      <div className="dark:hidden absolute inset-0 bg-white/95 backdrop-blur-md"></div>
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Image 
            src="/logo4.png" 
            alt="Neurona Logo" 
            width={40} 
            height={40} 
            className="dark:hidden"
          />
          <div className="hidden dark:block w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#004652'}}>
            <Image 
              src="/logo3.png" 
              alt="Neurona Logo" 
              width={40} 
              height={40} 
            />
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">
            Neurona
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#how-it-works" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">
            How it Works
          </a>
          <a href="#why" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">
            Why Neurona
          </a>
          <a href="#features" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">
            Features
          </a>
          <a href="#faq" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">
            FAQ
          </a>
        </div>
        
        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
            <Link href="#join">Get Early Access</Link>
          </Button>
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="p-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            🌓
          </button>
        </div>
      </nav>
    </header>
  )
}
