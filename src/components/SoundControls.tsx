import React, { useCallback } from 'react'
import { SoundPlayer } from './SoundPlayer'
import { SOUNDS, SOUND_PRESETS } from '../constants'
import { useSoundContext } from '../contexts/SoundContext'
import { storage } from '../utils'
import styles from './SoundControls.module.css'

export const SoundControls: React.FC = () => {
  const { applyPreset } = useSoundContext()

  const handlePresetClick = useCallback(
    (preset: (typeof SOUND_PRESETS)[0]) => {
      // Get saved volumes for all sounds
      const savedVolumes = storage.getSoundsVolume()

      // Apply preset but use saved volumes if they exist, otherwise use preset volumes
      const soundsWithSavedVolumes = preset.sounds.map(({ id, volume: presetVolume }) => ({
        id,
        volume: savedVolumes[id] ?? presetVolume, // Use saved volume if exists, otherwise preset volume
      }))

      applyPreset(soundsWithSavedVolumes)
    },
    [applyPreset]
  )

  return (
    <div className={styles.container} role="region" aria-label="Ambient sounds">
      {/* Sound Presets */}
      <div className={styles.presetsSection}>
        <div className={styles.presetsButtons}>
          {SOUND_PRESETS.map((preset) => (
            <button
              key={preset.id}
              className={styles.presetButton}
              onClick={() => handlePresetClick(preset)}
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

