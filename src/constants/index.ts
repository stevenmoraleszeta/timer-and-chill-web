export const MAX_HOURS = 99
export const MAX_MINUTES = 59
export const MAX_SECONDS = 59
export const TIMER_INTERVAL = 1000

// Timer presets (in minutes)
export const TIMER_PRESETS = [
  { label: '5 min', minutes: 5 },
  { label: '10 min', minutes: 10 },
  { label: '15 min', minutes: 15 },
  { label: '25 min', minutes: 25 },
  { label: '30 min', minutes: 30 },
  { label: '45 min', minutes: 45 },
  { label: '60 min', minutes: 60 },
  { label: '90 min', minutes: 90 },
]

// Pomodoro settings
export const POMODORO_WORK_MINUTES = 25
export const POMODORO_SHORT_BREAK_MINUTES = 5
export const POMODORO_LONG_BREAK_MINUTES = 15
export const POMODORO_SESSIONS_BEFORE_LONG_BREAK = 4

export const ACTIVITIES = [
  'Studying',
  'Reading',
  'Drawing',
  'Writing',
  'Sleeping',
  'Resting',
  'Programming',
  'Working',
  'Focusing',
  'Meditating',
  'Coding',
  'Learning',
  'Creating',
  'Designing',
  'Planning',
  'Thinking',
  'Reflecting',
  'Relaxing',
]

export const SOUNDS = [
  {
    id: 'rain',
    name: 'Rain',
    audioSrc: '/audio/sonidoLluvia.mp3',
    defaultVolume: 50,
  },
  {
    id: 'forest',
    name: 'Forest',
    audioSrc: '/audio/sonidoBosqueNocturno.mp3',
    defaultVolume: 50,
  },
  {
    id: 'cafe',
    name: 'Cafe',
    audioSrc: '/audio/sonidoCafeteria.mp3',
    defaultVolume: 50,
  },
  {
    id: 'garden',
    name: 'Garden',
    audioSrc: '/audio/sonidoJardin.mp3',
    defaultVolume: 50,
  },
  {
    id: 'farm',
    name: 'Farm',
    audioSrc: '/audio/sonidoGranja.mp3',
    defaultVolume: 50,
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    audioSrc: '/audio/sonidoRestaurante.mp3',
    defaultVolume: 50,
  },
]

// Sound mixing presets
export const SOUND_PRESETS = [
  {
    id: 'focus',
    name: 'Focus',
    description: 'Perfect for deep work',
    sounds: [
      { id: 'rain', volume: 60 },
      { id: 'forest', volume: 40 },
    ],
  },
  {
    id: 'cafe',
    name: 'Coffee Shop',
    description: 'Cafe ambiance',
    sounds: [
      { id: 'cafe', volume: 70 },
      { id: 'garden', volume: 40 },
    ],
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Natural sounds',
    sounds: [
      { id: 'garden', volume: 50 },
      { id: 'farm', volume: 50 },
      { id: 'rain', volume: 30 },
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Restaurant ambiance',
    sounds: [
      { id: 'restaurant', volume: 70 },
      { id: 'rain', volume: 30 },
    ],
  },
]

export const THEME_COLORS = {
  day: {
    fondo: '#f5ffcb',
    btnsReloj: '#516091',
    btnDiaNoche: '#eef3ad',
    header: '#74b3c1',
    fondoReloj: '#eef3ad',
    segundero: '#75b79e',
    botonesModificar: '#516091',
  },
  night: {
    fondo: '#516091',
    btnsReloj: '#abebbe',
    btnDiaNoche: '#516091',
    header: '#6a8caf',
    fondoReloj: '#6a8caf',
    segundero: '#eef3ad',
    botonesModificar: '#eef3ad',
  },
}

