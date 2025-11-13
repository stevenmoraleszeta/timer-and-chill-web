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

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.loop = true
    audioRef.current.volume = volume / 100
    audioRef.current.preload = 'metadata'

    const audio = audioRef.current

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      console.error(`Audio error for ${src}`)
      setIsPlaying(false)
      storage.setSoundPlaying(soundId, false)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    // Restore playing state if it was playing before
    if (savedIsPlaying) {
      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Failed to restore audio playback:', error)
          setIsPlaying(false)
          storage.setSoundPlaying(soundId, false)
        })
    }

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audioRef.current = null
    }
  }, [src, soundId])

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
    storage.setSoundPlaying(soundId, isPlaying)
  }, [isPlaying, soundId])

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
      }
    }
  }, [])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

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

