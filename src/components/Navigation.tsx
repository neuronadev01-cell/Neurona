"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { useTheme } from "./ThemeProvider"

export default function Navigation() {
  const { theme, setTheme } = useTheme()
  
  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }
  
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️'
      case 'dark': return '🌙'
      case 'system': return '🔄'
      default: return '🔄'
    }
  }
  
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
        
        {/* Mobile-optimized Navigation */}
        <div className="hidden sm:flex gap-4 lg:gap-8 text-xs lg:text-sm font-medium">
          <a href="#how-it-works" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">
            How it Works
          </a>
          <a href="#why" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">
            Why Neurona
          </a>
          <a href="#features" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">
            Features
          </a>
          <a href="#faq" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">
            FAQ
          </a>
        </div>
        
        {/* CTA Button - Mobile Optimized */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3 py-2">
            <Link href="#join">Get Early Access</Link>
          </Button>
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors"
            title={`Current: ${theme} theme`}
          >
            {getThemeIcon()}
          </button>
        </div>
      </nav>
    </header>
  )
}
