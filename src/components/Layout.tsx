import React from 'react'
import { Timer } from './Timer'
import { SoundControls } from './SoundControls'
import { Statistics } from './Statistics'
import { AnimatedText } from './AnimatedText'
import { ThemeToggle } from './ThemeToggle'
import leavesImage from '../assets/images/hojas.png'
import styles from './Layout.module.css'

export const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Activity text row - thin bar at the very top */}
      <div className={styles.activityBar}>
        <ThemeToggle />
        <AnimatedText />
      </div>

      <main className={styles.main}>

        <img
          className={styles.decorativeLeaves}
          src={leavesImage}
          alt="Decorative leaves"
          aria-hidden="true"
          loading="lazy"
        />
        
        <div className={styles.contentWrapper}>
          <Timer />
          <div className={styles.rightColumn}>
          <Statistics />
          <SoundControls />
          </div>
        </div>
      </main>
    </div>
  )
}

