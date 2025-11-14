import React, { useState, useMemo, useCallback } from 'react'
import { storage } from '../utils'
import { useLanguage } from '../contexts/LanguageContext'
import styles from './Statistics.module.css'

export const Statistics: React.FC = () => {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const stats = storage.getTimerStatistics()

  const formatDuration = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }, [])

  const averageDuration = useMemo(
    () => (stats.totalCompleted > 0 ? Math.round(stats.totalTime / stats.totalCompleted) : 0),
    [stats.totalCompleted, stats.totalTime]
  )

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closePanel = useCallback(() => {
    setIsOpen(false)
  }, [])
 
  return (
    <div className={styles.container}>
      <button
        className={styles.toggleButton}
        onClick={toggleOpen}
        aria-label={isOpen ? t.statistics.hide : t.statistics.show}
        aria-expanded={isOpen}
      >
        📊 {t.statistics.title}
      </button>

      {isOpen && (
        <div className={styles.statsPanel}>
          <div className={styles.statsHeader}>
            <h3>{t.statistics.title}</h3>
            <button
              className={styles.closeButton}
              onClick={closePanel}
              aria-label={t.statistics.close}
            >
              ×
            </button>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.totalCompleted}</div>
              <div className={styles.statLabel}>{t.statistics.sessionsCompleted}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>{formatDuration(stats.totalTime)}</div>
              <div className={styles.statLabel}>{t.statistics.totalTime}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>{formatDuration(averageDuration)}</div>
              <div className={styles.statLabel}>{t.statistics.averageDuration}</div>
            </div>

            {stats.lastCompleted && (
              <div className={styles.statCard}>
                <div className={styles.statValue}>
                  {new Date(stats.lastCompleted).toLocaleDateString()}
                </div>
                <div className={styles.statLabel}>{t.statistics.lastSession}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

