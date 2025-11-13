import React from 'react'
import { AnimatedText } from './AnimatedText'
import { ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <AnimatedText />
      <ThemeToggle />
    </header>
  )
}

