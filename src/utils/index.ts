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
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: icon || `${window.location.origin}/images/reloj.png`,
        tag: 'timer-complete',
      })
    } catch (error) {
      console.warn('Failed to show notification:', error)
    }
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
}

export const storage = {
  // Timer storage
  getTimerTime: (): { hours: number; minutes: number; seconds: number } | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMER_TIME)
      if (stored) {
        return JSON.parse(stored)
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
}

