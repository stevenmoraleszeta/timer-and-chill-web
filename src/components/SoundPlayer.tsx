import React, { useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'
import { useSoundContext } from '../contexts/SoundContext'
import playIcon from '../assets/images/play.png'
import stopIcon from '../assets/images/detener.png'
import styles from './SoundPlayer.module.css'

interface SoundPlayerProps {
  id: string
  name: string
  audioSrc: string
  defaultVolume?: number
}

export const SoundPlayer: React.FC<SoundPlayerProps> = ({
  id,
  name,
  audioSrc,
  defaultVolume = 50,
}) => {
  const { isPlaying, volume, setVolume, toggle, play, pause } = useAudio(id, audioSrc, defaultVolume)
  const { registerSound, unregisterSound } = useSoundContext()

  // Register this sound with the context
  useEffect(() => {
    registerSound(id, {
      setVolume,
      setPlaying: (playing: boolean) => {
        if (playing) {
          play()
        } else {
          pause()
        }
      },
      getVolume: () => volume,
      getPlaying: () => isPlaying,
    })

    return () => {
      unregisterSound(id)
    }
  }, [id, setVolume, play, pause, volume, isPlaying, registerSound, unregisterSound])

  return (
    <div className={`${styles.container} ${isPlaying ? styles.playing : ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>{name}</span>
        <input
          className={styles.volumeSlider}
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label={`${name} volume`}
        />
        <button
          className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
          onClick={toggle}
          aria-label={isPlaying ? `Pause ${name} sound` : `Play ${name} sound`}
        >
          <img
            className={styles.icon}
            src={isPlaying ? stopIcon : playIcon}
            alt={isPlaying ? 'Pause' : 'Play'}
          />
        </button>
      </div>
    </div>
  )
}

