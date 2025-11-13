export interface Time {
  hours: number
  minutes: number
  seconds: number
}

export interface Sound {
  id: string
  name: string
  audioSrc: string
  volume: number
  isPlaying: boolean
}

export type Theme = 'day' | 'night'

export interface ThemeColors {
  fondo: string
  btnsReloj: string
  btnDiaNoche: string
  header: string
  fondoReloj: string
  segundero: string
  botonesModificar: string
}

export interface TimerState {
  time: Time
  isRunning: boolean
  isEditing: boolean
}

