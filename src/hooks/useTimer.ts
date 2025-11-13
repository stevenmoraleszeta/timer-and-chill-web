import { useState, useEffect, useRef, useCallback } from 'react'
import { Time } from '../types'
import {
  MAX_HOURS,
  MAX_MINUTES,
  MAX_SECONDS,
  TIMER_INTERVAL,
  POMODORO_WORK_MINUTES,
  POMODORO_SHORT_BREAK_MINUTES,
  POMODORO_LONG_BREAK_MINUTES,
  POMODORO_SESSIONS_BEFORE_LONG_BREAK,
} from '../constants'
import {
  formatTime,
  requestNotificationPermission,
  showNotification,
  storage,
  timeToSeconds,
  secondsToTime,
} from '../utils'

const INITIAL_TIME: Time = { hours: 0, minutes: 0, seconds: 0 }

export const useTimer = () => {
  // Load initial state from localStorage
  const savedTime = storage.getTimerTime()
  const savedRunning = storage.getTimerRunning()
  const savedEditing = storage.getTimerEditing()
  const pomodoroState = storage.getPomodoroState()
  const savedInitialTime = storage.getInitialTime()

  const [time, setTime] = useState<Time>(savedTime || INITIAL_TIME)
  const [initialTime, setInitialTime] = useState<Time>(savedInitialTime || savedTime || INITIAL_TIME)
  // Don't restore running state - pause timer on refresh for safety
  const [isRunning, setIsRunning] = useState(false)
  const [isEditing, setIsEditing] = useState(savedEditing || false)
  const [isPomodoroMode, setIsPomodoroMode] = useState(pomodoroState.isPomodoroMode)
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(pomodoroState.sessionCount)
  const [isBreak, setIsBreak] = useState(pomodoroState.isBreak)
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
            const completedDuration = timeToSeconds(initialTime)
            storage.addTimerCompletion(completedDuration)

            if (isPomodoroMode) {
              // Handle Pomodoro completion
              if (!isBreak) {
                // Work session completed
                const newSessionCount = pomodoroSessionCount + 1
                setPomodoroSessionCount(newSessionCount)
                storage.setPomodoroState({
                  sessionCount: newSessionCount,
                  isPomodoroMode: true,
                  isBreak: true,
                })

                // Start break
                const breakMinutes =
                  newSessionCount % POMODORO_SESSIONS_BEFORE_LONG_BREAK === 0
                    ? POMODORO_LONG_BREAK_MINUTES
                    : POMODORO_SHORT_BREAK_MINUTES
                const breakTime = secondsToTime(breakMinutes * 60)
                setTime(breakTime)
                setInitialTime(breakTime)
                storage.setInitialTime(breakTime)
                setIsBreak(true)
                showNotification(
                  'Break Time!',
                  `Take a ${breakMinutes}-minute break. Session ${newSessionCount} completed!`
                )
                // Auto-start break
                setTimeout(() => setIsRunning(true), 1000)
              } else {
                // Break completed, start next work session
                setIsBreak(false)
                const workTime = secondsToTime(POMODORO_WORK_MINUTES * 60)
                setTime(workTime)
                setInitialTime(workTime)
                storage.setInitialTime(workTime)
                storage.setPomodoroState({
                  sessionCount: pomodoroSessionCount,
                  isPomodoroMode: true,
                  isBreak: false,
                })
                showNotification('Work Time!', 'Time to focus!')
                // Auto-start work session
                setTimeout(() => setIsRunning(true), 1000)
              }
            } else {
              showNotification('Timer Complete', '¡El tiempo ha terminado!')
              setTime(INITIAL_TIME)
              setInitialTime(INITIAL_TIME)
              storage.setInitialTime(INITIAL_TIME)
            }
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
  }, [isRunning, isPomodoroMode, isBreak, pomodoroSessionCount, initialTime])

  const start = useCallback(() => {
    if (time.hours > 0 || time.minutes > 0 || time.seconds > 0) {
      // Save initial time when starting (only if not already set or if time changed)
      const currentInitialSeconds = timeToSeconds(initialTime)
      const currentTimeSeconds = timeToSeconds(time)
      if (!isRunning && (currentInitialSeconds === 0 || currentInitialSeconds !== currentTimeSeconds)) {
        setInitialTime(time)
        storage.setInitialTime(time)
      }
      setIsRunning(true)
    }
  }, [time, isRunning, initialTime])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTime(INITIAL_TIME)
    setInitialTime(INITIAL_TIME)
    storage.setInitialTime(INITIAL_TIME)
    if (isPomodoroMode) {
      setIsPomodoroMode(false)
      setIsBreak(false)
      setPomodoroSessionCount(0)
      storage.setPomodoroState({
        sessionCount: 0,
        isPomodoroMode: false,
        isBreak: false,
      })
    }
  }, [isPomodoroMode])

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

  const setPreset = useCallback((minutes: number) => {
    const presetTime = secondsToTime(minutes * 60)
    setTime(presetTime)
    setInitialTime(presetTime)
    storage.setInitialTime(presetTime)
    setIsRunning(false)
    setIsEditing(false)
  }, [])

  const startPomodoro = useCallback(() => {
    setIsPomodoroMode(true)
    setIsBreak(false)
    setPomodoroSessionCount(0)
    const workTime = secondsToTime(POMODORO_WORK_MINUTES * 60)
    setTime(workTime)
    setInitialTime(workTime)
    storage.setInitialTime(workTime)
    storage.setPomodoroState({
      sessionCount: 0,
      isPomodoroMode: true,
      isBreak: false,
    })
    setIsRunning(false)
    setIsEditing(false)
  }, [])

  const stopPomodoro = useCallback(() => {
    setIsPomodoroMode(false)
    setIsBreak(false)
    setPomodoroSessionCount(0)
    storage.setPomodoroState({
      sessionCount: 0,
      isPomodoroMode: false,
      isBreak: false,
    })
  }, [])

  // Calculate progress percentage
  const progress = useCallback(() => {
    if (initialTime.hours === 0 && initialTime.minutes === 0 && initialTime.seconds === 0) {
      return 0
    }
    const initialSeconds = timeToSeconds(initialTime)
    const currentSeconds = timeToSeconds(time)
    const elapsed = initialSeconds - currentSeconds
    return Math.min(100, Math.max(0, (elapsed / initialSeconds) * 100))
  }, [time, initialTime])

  const formattedTime = {
    hours: formatTime(time.hours),
    minutes: formatTime(time.minutes),
    seconds: formatTime(time.seconds),
  }

  // Save Pomodoro state
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    storage.setPomodoroState({
      sessionCount: pomodoroSessionCount,
      isPomodoroMode,
      isBreak,
    })
  }, [pomodoroSessionCount, isPomodoroMode, isBreak])

  return {
    time,
    initialTime,
    formattedTime,
    isRunning,
    isEditing,
    isPomodoroMode,
    isBreak,
    pomodoroSessionCount,
    progress: progress(),
    start,
    pause,
    reset,
    toggle,
    adjustTime,
    toggleEdit,
    setPreset,
    startPomodoro,
    stopPomodoro,
  }
}

