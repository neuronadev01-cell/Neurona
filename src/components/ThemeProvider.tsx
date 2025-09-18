"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme state to match server-side script behavior
  const [theme, setTheme] = useState<Theme>(() => {
    // This will only run on client-side during hydration
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null
      return stored || 'system'
    }
    return 'system'
  })
  
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    // Initialize resolved theme to match what the server-side script would set
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null
      const themeToCheck = stored || 'system'
      
      if (themeToCheck === 'dark') {
        return 'dark'
      } else if (themeToCheck === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } else {
        return 'light'
      }
    }
    return 'light'
  })

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement
      
      if (theme === 'system') {
        // Follow system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (systemPrefersDark) {
          root.classList.add('dark')
          setResolvedTheme('dark')
        } else {
          root.classList.remove('dark')
          setResolvedTheme('light')
        }
      } else if (theme === 'dark') {
        root.classList.add('dark')
        setResolvedTheme('dark')
      } else {
        root.classList.remove('dark')
        setResolvedTheme('light')
      }
    }

    applyTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme()
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}