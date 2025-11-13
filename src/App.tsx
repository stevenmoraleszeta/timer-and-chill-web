import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import styles from './App.module.css'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className={styles.app}>
          <Layout />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

