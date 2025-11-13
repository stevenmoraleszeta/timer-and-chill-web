import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import sunIcon from '../assets/images/sol.png'
import moonIcon from '../assets/images/luna.png'
import styles from './ThemeToggle.module.css'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={toggleTheme}
        aria-label={`Toggle ${theme === 'day' ? 'night' : 'day'} mode`}
      >
        <img
          className={styles.icon}
          src={theme === 'day' ? sunIcon : moonIcon}
          alt={theme === 'day' ? 'Day mode' : 'Night mode'}
        />
      </button>
    </div>
  )
}

