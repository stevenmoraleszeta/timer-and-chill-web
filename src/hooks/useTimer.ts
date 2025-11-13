import { useState, useEffect, useRef, useCallback } from 'react'
import { Time } from '../types'
import { MAX_HOURS, MAX_MINUTES, MAX_SECONDS, TIMER_INTERVAL } from '../constants'
import { formatTime, requestNotificationPermission, showNotification, storage } from '../utils'

const INITIAL_TIME: Time = { hours: 0, minutes: 0, seconds: 0 }

export const useTimer = () => {
  // Load initial state from localStorage
  const savedTime = storage.getTimerTime()
  const savedRunning = storage.getTimerRunning()
  const savedEditing = storage.getTimerEditing()

  const [time, setTime] = useState<Time>(savedTime || INITIAL_TIME)
  // Don't restore running state - pause timer on refresh for safety
  const [isRunning, setIsRunning] = useState(false)
  const [isEditing, setIsEditing] = useState(savedEditing || false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  // Save time to localStorage whenever it changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    storage.setTimerTime(time)
  }, [time])

  // Save running state to localStorage whenever it changes
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    storage.setTimerRunning(isRunning)
  }, [isRunning])

  // Save editing state to localStorage whenever it changes
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    storage.setTimerEditing(isEditing)
  }, [isEditing])

  // Timer countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 }
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: MAX_SECONDS }
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: MAX_MINUTES, seconds: MAX_SECONDS }
          } else {
            // Timer finished
            setIsRunning(false)
            showNotification('Timer Complete', '¡El tiempo ha terminado!')
            return INITIAL_TIME
          }
        })
      }, TIMER_INTERVAL)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const start = useCallback(() => {
    if (time.hours > 0 || time.minutes > 0 || time.seconds > 0) {
      setIsRunning(true)
    }
  }, [time])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTime(INITIAL_TIME)
  }, [])

  const toggle = useCallback(() => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }, [isRunning, start, pause])

  const adjustTime = useCallback(
    (type: 'hours' | 'minutes' | 'seconds', direction: 'increment' | 'decrement') => {
      setTime((prev) => {
        const maxValues = {
          hours: MAX_HOURS,
          minutes: MAX_MINUTES,
          seconds: MAX_SECONDS,
        }
        const max = maxValues[type]

        if (direction === 'increment') {
          const newValue = prev[type] < max ? prev[type] + 1 : 0
          return { ...prev, [type]: newValue }
        } else {
          const newValue = prev[type] > 0 ? prev[type] - 1 : max
          return { ...prev, [type]: newValue }
        }
      })
    },
    []
  )

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev)
  }, [])

  const formattedTime = {
    hours: formatTime(time.hours),
    minutes: formatTime(time.minutes),
    seconds: formatTime(time.seconds),
  }

  return {
    time,
    formattedTime,
    isRunning,
    isEditing,
    start,
    pause,
    reset,
    toggle,
    adjustTime,
    toggleEdit,
  }
}

