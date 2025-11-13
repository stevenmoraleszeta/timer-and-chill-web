import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { BsSun, BsMoon } from 'react-icons/bs'
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
        {theme === 'day' ? (
          <BsSun className={styles.icon} />
        ) : (
          <BsMoon className={styles.icon} />
        )}
      </button>
    </div>
  )
}

