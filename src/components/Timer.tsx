import React from 'react'
import { useTimer } from '../hooks/useTimer'
import playIcon from '../assets/images/play.png'
import stopIcon from '../assets/images/detener.png'
import editIcon from '../assets/images/boligrafo.png'
import saveIcon from '../assets/images/guardar.png'
import styles from './Timer.module.css'

export const Timer: React.FC = () => {
  const {
    formattedTime,
    isRunning,
    isEditing,
    toggle,
    reset,
    adjustTime,
    toggleEdit,
  } = useTimer()

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        {isEditing && (
          <div className={styles.adjustButtonsTop}>
            <button
              onClick={() => adjustTime('hours', 'increment')}
              aria-label="Increase hours"
            >
              +
            </button>
            <button
              onClick={() => adjustTime('minutes', 'increment')}
              aria-label="Increase minutes"
            >
              +
            </button>
            <button
              onClick={() => adjustTime('seconds', 'increment')}
              aria-label="Increase seconds"
            >
              +
            </button>
          </div>
        )}

        <div className={styles.timeDisplay} role="timer" aria-live="polite" aria-atomic="true">
          <span aria-label="Hours">{formattedTime.hours}</span>
          <span aria-hidden="true">:</span>
          <span aria-label="Minutes">{formattedTime.minutes}</span>
          <span aria-label="Seconds">{formattedTime.seconds}</span>
        </div>

        {isEditing && (
          <div className={styles.adjustButtonsBottom}>
            <button
              onClick={() => adjustTime('hours', 'decrement')}
              aria-label="Decrease hours"
            >
              -
            </button>
            <button
              onClick={() => adjustTime('minutes', 'decrement')}
              aria-label="Decrease minutes"
            >
              -
            </button>
            <button
              onClick={() => adjustTime('seconds', 'decrement')}
              aria-label="Decrease seconds"
            >
              -
            </button>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.resetButton}
          onClick={reset}
          aria-label="Reset timer"
        >
          0:00
        </button>
        <button
          className={styles.editButton}
          onClick={toggleEdit}
          aria-label={isEditing ? 'Save timer' : 'Edit timer'}
        >
          <img
            className={styles.icon}
            src={isEditing ? saveIcon : editIcon}
            alt={isEditing ? 'Save' : 'Edit'}
          />
        </button>
        <button
          className={styles.playButton}
          onClick={toggle}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          <img
            className={styles.icon}
            src={isRunning ? stopIcon : playIcon}
            alt={isRunning ? 'Pause' : 'Play'}
          />
        </button>
      </div>
    </div>
  )
}

