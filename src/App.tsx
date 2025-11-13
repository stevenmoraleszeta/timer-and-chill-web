import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { SoundProvider } from './contexts/SoundContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import styles from './App.module.css'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SoundProvider>
          <div className={styles.app}>
            <Layout />
          </div>
        </SoundProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

