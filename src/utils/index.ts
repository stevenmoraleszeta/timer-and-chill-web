/**
 * Format time value with leading zero
 */
export const formatTime = (value: number): string => {
  return value > 9 ? value.toString() : `0${value}`
}

/**
 * Format time object to string (HH:MM:SS)
 */
export const formatTimeString = (time: { hours: number; minutes: number; seconds: number }): string => {
  return `${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`
}

/**
 * Calculate total seconds from time object
 */
export const timeToSeconds = (time: { hours: number; minutes: number; seconds: number }): number => {
  return time.hours * 3600 + time.minutes * 60 + time.seconds
}

/**
 * Calculate time object from total seconds
 */
export const secondsToTime = (totalSeconds: number): { hours: number; minutes: number; seconds: number } => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds }
}

/**
 * Request notification permission
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'default') {
    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.warn('Notification permission request failed:', error)
      return false
    }
  }

  return false
}

/**
 * Show notification
 */
export const showNotification = (title: string, body: string, icon?: string): void => {
  if (!('Notification' in window)) {
    return
  }

  if (Notification.permission !== 'granted') {
    return
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: icon || `${window.location.origin}/images/reloj.png`,
      tag: 'timer-complete',
      requireInteraction: false,
    })

    // Auto-close notification after 5 seconds
    setTimeout(() => {
      notification.close()
    }, 5000)
  } catch (error) {
    console.warn('Failed to show notification:', error)
  }
}

/**
 * LocalStorage utilities
 */
const STORAGE_KEYS = {
  TIMER_TIME: 'timer-and-chill:timer-time',
  TIMER_RUNNING: 'timer-and-chill:timer-running',
  TIMER_EDITING: 'timer-and-chill:timer-editing',
  SOUNDS_VOLUME: 'timer-and-chill:sounds-volume',
  SOUNDS_PLAYING: 'timer-and-chill:sounds-playing',
  THEME: 'timer-and-chill:theme',
  TIMER_STATISTICS: 'timer-and-chill:timer-statistics',
  POMODORO_STATE: 'timer-and-chill:pomodoro-state',
  INITIAL_TIME: 'timer-and-chill:initial-time',
}

export const storage = {
  // Timer storage
  getTimerTime: (): { hours: number; minutes: number; seconds: number } | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMER_TIME)
      if (stored) {
        const parsed = JSON.parse(stored) as { hours: number; minutes: number; seconds: number }
        // Validate the structure
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          typeof parsed.hours === 'number' &&
          typeof parsed.minutes === 'number' &&
          typeof parsed.seconds === 'number'
        ) {
          return parsed
        }
      }
    } catch (error) {
      console.warn('Failed to load timer time from localStorage:', error)
    }
    return null
  },

  setTimerTime: (time: { hours: number; minutes: number; seconds: number }): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER_TIME, JSON.stringify(time))
    } catch (error) {
      console.warn('Failed to save timer time to localStorage:', error)
    }
  },

  getTimerRunning: (): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMER_RUNNING)
      return stored === 'true'
    } catch (error) {
      console.warn('Failed to load timer running state from localStorage:', error)
      return false
    }
  },

  setTimerRunning: (isRunning: boolean): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER_RUNNING, String(isRunning))
    } catch (error) {
      console.warn('Failed to save timer running state to localStorage:', error)
    }
  },

  getTimerEditing: (): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMER_EDITING)
      return stored === 'true'
    } catch (error) {
      console.warn('Failed to load timer editing state from localStorage:', error)
      return false
    }
  },

  setTimerEditing: (isEditing: boolean): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER_EDITING, String(isEditing))
    } catch (error) {
      console.warn('Failed to save timer editing state to localStorage:', error)
    }
  },

  // Sounds storage
  getSoundsVolume: (): Record<string, number> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SOUNDS_VOLUME)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load sounds volume from localStorage:', error)
    }
    return {}
  },

  setSoundVolume: (soundId: string, volume: number): void => {
    try {
      const volumes = storage.getSoundsVolume()
      volumes[soundId] = volume
      localStorage.setItem(STORAGE_KEYS.SOUNDS_VOLUME, JSON.stringify(volumes))
    } catch (error) {
      console.warn('Failed to save sound volume to localStorage:', error)
    }
  },

  getSoundsPlaying: (): Record<string, boolean> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SOUNDS_PLAYING)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load sounds playing state from localStorage:', error)
    }
    return {}
  },

  setSoundPlaying: (soundId: string, isPlaying: boolean): void => {
    try {
      const playing = storage.getSoundsPlaying()
      playing[soundId] = isPlaying
      localStorage.setItem(STORAGE_KEYS.SOUNDS_PLAYING, JSON.stringify(playing))
    } catch (error) {
      console.warn('Failed to save sound playing state to localStorage:', error)
    }
  },

  // Theme storage
  getTheme: (): 'day' | 'night' | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME)
      if (stored === 'day' || stored === 'night') {
        return stored
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
    }
    return null
  },

  setTheme: (theme: 'day' | 'night'): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  },

  // Timer statistics
  getTimerStatistics: (): {
    totalCompleted: number
    totalTime: number // in seconds
    lastCompleted: string | null
    sessions: Array<{ date: string; duration: number }>
  } => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMER_STATISTICS)
      if (stored) {
        const parsed = JSON.parse(stored) as {
          totalCompleted: number
          totalTime: number
          lastCompleted: string | null
          sessions: Array<{ date: string; duration: number }>
        }
        // Validate the structure
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          typeof parsed.totalCompleted === 'number' &&
          typeof parsed.totalTime === 'number' &&
          Array.isArray(parsed.sessions)
        ) {
          return parsed
        }
      }
    } catch (error) {
      console.warn('Failed to load timer statistics from localStorage:', error)
    }
    return {
      totalCompleted: 0,
      totalTime: 0,
      lastCompleted: null,
      sessions: [],
    }
  },

  addTimerCompletion: (duration: number): void => {
    try {
      const stats = storage.getTimerStatistics()
      stats.totalCompleted += 1
      stats.totalTime += duration
      stats.lastCompleted = new Date().toISOString()
      stats.sessions.push({
        date: new Date().toISOString(),
        duration,
      })
      // Keep only last 100 sessions
      if (stats.sessions.length > 100) {
        stats.sessions = stats.sessions.slice(-100)
      }
      localStorage.setItem(STORAGE_KEYS.TIMER_STATISTICS, JSON.stringify(stats))
    } catch (error) {
      console.warn('Failed to save timer statistics to localStorage:', error)
    }
  },

  // Initial time for progress calculation
  getInitialTime: (): { hours: number; minutes: number; seconds: number } | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INITIAL_TIME)
      if (stored) {
        const parsed = JSON.parse(stored) as { hours: number; minutes: number; seconds: number }
        // Validate the structure
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          typeof parsed.hours === 'number' &&
          typeof parsed.minutes === 'number' &&
          typeof parsed.seconds === 'number'
        ) {
          return parsed
        }
      }
    } catch (error) {
      console.warn('Failed to load initial time from localStorage:', error)
    }
    return null
  },

  setInitialTime: (time: { hours: number; minutes: number; seconds: number }): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.INITIAL_TIME, JSON.stringify(time))
    } catch (error) {
      console.warn('Failed to save initial time to localStorage:', error)
    }
  },

  // Pomodoro state
  getPomodoroState: (): {
    sessionCount: number
    isPomodoroMode: boolean
    isBreak: boolean
  } => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.POMODORO_STATE)
      if (stored) {
        const parsed = JSON.parse(stored) as {
          sessionCount: number
          isPomodoroMode: boolean
          isBreak: boolean
        }
        // Validate the structure
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          typeof parsed.sessionCount === 'number' &&
          typeof parsed.isPomodoroMode === 'boolean' &&
          typeof parsed.isBreak === 'boolean'
        ) {
          return parsed
        }
      }
    } catch (error) {
      console.warn('Failed to load Pomodoro state from localStorage:', error)
    }
    return {
      sessionCount: 0,
      isPomodoroMode: false,
      isBreak: false,
    }
  },

  setPomodoroState: (state: {
    sessionCount: number
    isPomodoroMode: boolean
    isBreak: boolean
  }): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.POMODORO_STATE, JSON.stringify(state))
    } catch (error) {
      console.warn('Failed to save Pomodoro state to localStorage:', error)
    }
  },
}

