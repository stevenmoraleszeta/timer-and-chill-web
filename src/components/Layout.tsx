import React from 'react'
import { Header } from './Header'
import { Timer } from './Timer'
import { SoundControls } from './SoundControls'
import leavesImage from '../assets/images/hojas.png'
import styles from './Layout.module.css'

export const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <img
          className={styles.decorativeLeaves}
          src={leavesImage}
          alt="Decorative leaves"
          aria-hidden="true"
        />
        <div className={styles.contentWrapper}>
          <Timer />
          <SoundControls />
        </div>
      </main>
    </div>
  )
}

