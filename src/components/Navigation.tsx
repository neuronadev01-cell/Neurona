"use client"

import React from "react"

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm dark:bg-slate-900/80">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <span className="font-bold text-xl bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
          Neurona
        </span>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#mission" className="hover:text-emerald-600">Mission</a>
          <a href="#why" className="hover:text-emerald-600">Why Us</a>
          <a href="#tools" className="hover:text-emerald-600">Tools</a>
          <a href="#testimonials" className="hover:text-emerald-600">Testimonials</a>
          <a href="#faq" className="hover:text-emerald-600">FAQ</a>
          <a href="#join" className="hover:text-emerald-600">Join</a>
        </div>
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="px-3 py-1 rounded-lg border text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          🌓
        </button>
      </nav>
    </header>
  )
}
