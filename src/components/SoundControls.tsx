import React from 'react'
import { SoundPlayer } from './SoundPlayer'
import { SOUNDS } from '../constants'
import styles from './SoundControls.module.css'

export const SoundControls: React.FC = () => {
  return (
    <div className={styles.container} role="region" aria-label="Ambient sounds">
      {SOUNDS.map((sound) => (
        <SoundPlayer
          key={sound.id}
          id={sound.id}
          name={sound.name}
          audioSrc={sound.audioSrc}
          defaultVolume={sound.defaultVolume}
        />
      ))}
    </div>
  )
}

