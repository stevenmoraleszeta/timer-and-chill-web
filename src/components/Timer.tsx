import React, { useEffect, useCallback } from 'react'
import { useTimer } from '../hooks/useTimer'
import { TIMER_PRESETS } from '../constants'
import { BsPlayFill, BsPauseFill, BsPencil, BsCheck } from 'react-icons/bs'
import styles from './Timer.module.css'

export const Timer: React.FC = () => {
  const {
    formattedTime,
    isRunning,
    isEditing,
    isPomodoroMode,
    isBreak,
    pomodoroSessionCount,
    progress,
    toggle,
    reset,
    adjustTime,
    toggleEdit,
    setPreset,
    startPomodoro,
    stopPomodoro,
  } = useTimer()

  // Keyboard shortcuts
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement
      ) {
        return
      }

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault()
          toggle()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          reset()
          break
        case 'e':
        case 'E':
          e.preventDefault()
          toggleEdit()
          break
        case 'p':
        case 'P':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            if (isPomodoroMode) {
              stopPomodoro()
            } else {
              startPomodoro()
            }
          }
          break
        default:
          break
      }
    },
    [toggle, reset, toggleEdit, startPomodoro, stopPomodoro, isPomodoroMode]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <div className={styles.container}>
      {/* Pomodoro indicator */}
      {isPomodoroMode && (
        <div className={styles.pomodoroIndicator}>
          <span className={styles.pomodoroLabel}>
            {isBreak ? 'Break' : 'Work'} - Session {pomodoroSessionCount + (isBreak ? 0 : 1)}
          </span>
          {!isBreak && (
            <button
              className={styles.stopPomodoroButton}
              onClick={stopPomodoro}
              aria-label="Stop Pomodoro"
            >
              Stop
            </button>
          )}
        </div>
      )}

      {/* Timer presets */}
      {!isEditing && (
        <div className={styles.presets}>
          <div className={styles.presetsButtons}>
            {TIMER_PRESETS.map((preset) => (
              <button
                key={preset.label}
                className={styles.presetButton}
                onClick={() => setPreset(preset.minutes)}
                aria-label={`Set timer to ${preset.label}`}
              >
                {preset.label}
              </button>
            ))}
            {!isPomodoroMode && (
              <button
                className={`${styles.presetButton} ${styles.pomodoroButton}`}
                onClick={startPomodoro}
                aria-label="Start Pomodoro timer"
              >
                🍅 Pomodoro
              </button>
            )}
          </div>
        </div>
      )}

      <div className={styles.timer}>
        {/* Progress ring - on the border */}
        <div className={styles.progressRing}>
          <svg className={styles.progressSvg} viewBox="0 0 100 100">
            <circle
              className={styles.progressBackground}
              cx="50"
              cy="50"
              r="48"
              fill="none"
              strokeWidth="4"
            />
            <circle
              className={styles.progressBar}
              cx="50"
              cy="50"
              r="48"
              fill="none"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 48}`}
              strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>

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
          title="Reset (R)"
        >
          0:00
        </button>
        <button
          className={styles.editButton}
          onClick={toggleEdit}
          aria-label={isEditing ? 'Save timer' : 'Edit timer'}
          title="Edit (E)"
        >
          {isEditing ? (
            <BsCheck className={styles.icon} />
          ) : (
            <BsPencil className={styles.icon} />
          )}
        </button>
        <button
          className={styles.playButton}
          onClick={toggle}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          title={isRunning ? 'Pause (Space)' : 'Start (Space)'}
        >
          {isRunning ? (
            <BsPauseFill className={styles.icon} />
          ) : (
            <BsPlayFill className={styles.icon} />
          )}
        </button>
      </div>
    </div>
  )
}

