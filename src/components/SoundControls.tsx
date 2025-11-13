import React from 'react'
import { SoundPlayer } from './SoundPlayer'
import { SOUNDS, SOUND_PRESETS } from '../constants'
import { useSoundContext } from '../contexts/SoundContext'
import styles from './SoundControls.module.css'

export const SoundControls: React.FC = () => {
  const { applyPreset } = useSoundContext()

  return (
    <div className={styles.container} role="region" aria-label="Ambient sounds">
      {/* Sound Presets */}
      <div className={styles.presetsSection}>
        <div className={styles.presetsLabel}>Sound Presets:</div>
        <div className={styles.presetsButtons}>
          {SOUND_PRESETS.map((preset) => (
            <button
              key={preset.id}
              className={styles.presetButton}
              onClick={() => applyPreset(preset.sounds)}
              aria-label={`Apply ${preset.name} sound preset`}
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Individual Sound Controls */}
      <div className={styles.soundsSection}>
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
    </div>
  )
}

