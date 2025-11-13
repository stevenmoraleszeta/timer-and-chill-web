import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Theme, ThemeColors } from '../types'
import { THEME_COLORS } from '../constants'
import { storage } from '../utils'

interface ThemeContextType {
  theme: Theme
  colors: ThemeColors
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Detect system theme preference
  const getSystemTheme = (): Theme => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'night'
    }
    return 'day'
  }

  // Load theme from localStorage or use system preference
  const savedTheme = storage.getTheme()
  const [theme, setTheme] = useState<Theme>(savedTheme || getSystemTheme())

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't manually set a preference
      if (!savedTheme) {
        setTheme(e.matches ? 'night' : 'day')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [savedTheme])

  const colors = THEME_COLORS[theme]

  useEffect(() => {
    // Apply theme colors to CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--color-fondo', colors.fondo)
    root.style.setProperty('--color-btns-reloj', colors.btnsReloj)
    root.style.setProperty('--color-btn-dia-noche', colors.btnDiaNoche)
    root.style.setProperty('--color-header', colors.header)
    root.style.setProperty('--color-fondo-reloj', colors.fondoReloj)
    root.style.setProperty('--color-segundero', colors.segundero)
    root.style.setProperty('--color-bontones-modificar-hora', colors.botonesModificar)
    
    // Apply gradient background to body
    const body = document.body
    if (theme === 'day') {
      body.style.background = 'linear-gradient(135deg, var(--color-fondo) 0%, #e8f5c4 100%)'
    } else {
      body.style.background = 'linear-gradient(135deg, var(--color-fondo) 0%, #405070 100%)'
    }

    // Save theme to localStorage
    storage.setTheme(theme)
  }, [colors, theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'day' ? 'night' : 'day'))
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

