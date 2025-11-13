import React, { createContext, useContext, ReactNode } from 'react'

interface SoundControl {
  setVolume: (volume: number) => void
  setPlaying: (playing: boolean) => void
  getVolume: () => number
  getPlaying: () => boolean
}

interface SoundContextType {
  registerSound: (id: string, control: SoundControl) => void
  unregisterSound: (id: string) => void
  applyPreset: (preset: { id: string; volume: number }[]) => void
  getSoundControl: (id: string) => SoundControl | undefined
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export const useSoundContext = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider')
  }
  return context
}

interface SoundProviderProps {
  children: ReactNode
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const soundsRef = React.useRef<Map<string, SoundControl>>(new Map())

  const registerSound = React.useCallback((id: string, control: SoundControl) => {
    soundsRef.current.set(id, control)
  }, [])

  const unregisterSound = React.useCallback((id: string) => {
    soundsRef.current.delete(id)
  }, [])

  const getSoundControl = React.useCallback((id: string) => {
    return soundsRef.current.get(id)
  }, [])

  const applyPreset = React.useCallback((preset: { id: string; volume: number }[]) => {
    // Stop all sounds first
    soundsRef.current.forEach((control) => {
      control.setPlaying(false)
    })

    // Apply preset
    preset.forEach(({ id, volume }) => {
      const control = soundsRef.current.get(id)
      if (control) {
        control.setVolume(volume)
        control.setPlaying(true)
      }
    })
  }, [])

  return (
    <SoundContext.Provider
      value={{
        registerSound,
        unregisterSound,
        applyPreset,
        getSoundControl,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

