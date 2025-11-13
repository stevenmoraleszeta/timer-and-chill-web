import { useState, useEffect, useRef, useCallback } from 'react'
import { Sound } from '../types'
import { storage } from '../utils'

export const useAudio = (soundId: string, src: string, defaultVolume: number = 50) => {
  // Load initial state from localStorage
  const savedVolumes = storage.getSoundsVolume()
  const savedPlaying = storage.getSoundsPlaying()
  const savedVolume = savedVolumes[soundId] ?? defaultVolume
  const savedIsPlaying = savedPlaying[soundId] ?? false

  const [isPlaying, setIsPlaying] = useState(savedIsPlaying)
  const [volume, setVolume] = useState(savedVolume)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isInitialMount = useRef(true)
  const hasTriedRestore = useRef(false)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.loop = true
    audioRef.current.volume = savedVolume / 100
    audioRef.current.preload = 'auto'

    const audio = audioRef.current

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleError = (error: Event) => {
      console.error(`Audio error for ${src}:`, error)
      setIsPlaying(false)
      storage.setSoundPlaying(soundId, false)
    }

    const tryRestorePlayback = () => {
      // Only try once per mount
      if (hasTriedRestore.current) return
      hasTriedRestore.current = true

      if (savedIsPlaying && audioRef.current) {
        setTimeout(() => {
          if (audioRef.current && savedIsPlaying) {
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true)
              })
              .catch((error) => {
                // Autoplay may be blocked by browser policy
                // This is expected and we'll just keep the state saved for manual play
                hasTriedRestore.current = false // Allow retry on user interaction
              })
          }
        }, 300)
      }
    }

    const handleCanPlay = () => {
      tryRestorePlayback()
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('loadeddata', handleCanPlay)

    // Try to restore immediately if audio is already loaded
    if (savedIsPlaying) {
      if (audio.readyState >= 2) {
        tryRestorePlayback()
      }
    }

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('loadeddata', handleCanPlay)
      audioRef.current = null
      hasTriedRestore.current = false
    }
  }, [src, soundId, savedIsPlaying, savedVolume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Save volume to localStorage whenever it changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    storage.setSoundVolume(soundId, volume)
  }, [volume, soundId])

  // Save playing state to localStorage whenever it changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    // Always save the current playing state
    storage.setSoundPlaying(soundId, isPlaying)
  }, [isPlaying, soundId])

  // Update audio element when isPlaying state changes (for manual play/pause)
  // This effect handles user-initiated play/pause, not automatic restoration
  useEffect(() => {
    if (!audioRef.current) return
    
    // Skip synchronization during initial mount if we're trying to restore
    if (isInitialMount.current) {
      return
    }

    // Always sync the audio element with the state
    if (isPlaying && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.error('[useAudio] Error playing audio:', error)
        setIsPlaying(false)
        storage.setSoundPlaying(soundId, false)
      })
    } else if (!isPlaying && !audioRef.current.paused) {
      audioRef.current.pause()
    }
  }, [isPlaying, soundId])

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
        storage.setSoundPlaying(soundId, false)
      }
    }
  }, [soundId])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      storage.setSoundPlaying(soundId, false)
    }
  }, [soundId])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  return {
    isPlaying,
    volume,
    setVolume,
    play,
    pause,
    toggle,
  }
}

