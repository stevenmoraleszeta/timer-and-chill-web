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
  // Load theme from localStorage or use day mode as default
  const savedTheme = storage.getTheme()
  const [theme, setTheme] = useState<Theme>(savedTheme || 'day')


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
    root.style.setProperty('--text-primary', '#ffffff')
    // Text color for Statistics: dark blue in day mode, white in night mode
    root.style.setProperty('--text-stats', theme === 'day' ? '#516091' : '#ffffff')
    // Text color for presets and activity text: dark blue in day mode, white in night mode
    root.style.setProperty('--text-presets', theme === 'day' ? '#516091' : '#ffffff')
    // Background for stats panel: white in day mode, darker in night mode
    root.style.setProperty('--stats-panel-bg', theme === 'day' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(81, 96, 145, 0.95)')
    root.style.setProperty('--stats-panel-border', theme === 'day' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)')
    root.style.setProperty('--stats-card-bg', theme === 'day' ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)')
    root.style.setProperty('--stats-card-border', theme === 'day' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)')
    root.style.setProperty('--stats-item-bg', theme === 'day' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)')
    root.style.setProperty('--stats-item-border', theme === 'day' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)')
    root.style.setProperty('--stats-divider', theme === 'day' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)')
    // Background for preset buttons in day mode: light green
    root.style.setProperty('--preset-button-bg', theme === 'day' 
      ? 'rgba(173, 235, 190, 0.4)' 
      : 'rgba(255, 255, 255, 0.25)');
    root.style.setProperty('--preset-button-border', theme === 'day' 
      ? 'rgba(173, 235, 190, 0.6)' 
      : 'rgba(255, 255, 255, 0.4)');
    root.style.setProperty('--preset-button-hover-bg', theme === 'day' 
      ? 'rgba(173, 235, 190, 0.5)' 
      : 'rgba(255, 255, 255, 0.35)');
    // Progress bar color: lighter in day mode
    root.style.setProperty('--progress-bar-color', theme === 'day' 
      ? '#adebbe' 
      : colors.segundero);
    root.style.setProperty('--progress-background-color', theme === 'day' 
      ? 'rgba(173, 235, 190, 0.4)' 
      : 'rgba(116, 179, 193, 0.3)');
    // Gradient for theme toggle button: modern and elegant
    root.style.setProperty('--theme-toggle-gradient', theme === 'day' 
      ? 'linear-gradient(135deg, #516091 0%, #6b7fa8 100%)' 
      : 'linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #718096 100%)');
    
    // Apply background to body
    const body = document.body
    if (theme === 'day') {
      body.style.background = 'linear-gradient(135deg, var(--color-fondo) 0%, #e8f5c4 100%)'
      body.style.backgroundAttachment = 'fixed'
    } else {
      body.style.background = 'var(--color-fondo)'
      body.style.backgroundAttachment = 'fixed'
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

