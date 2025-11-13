import React, { Component, ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error('Error caught by boundary:', error, errorInfo)
    
    // In production, you might want to send this to an error tracking service
    // Example: errorTrackingService.logError(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container} role="alert">
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            className={styles.button}
            onClick={this.handleReset}
            aria-label="Reset application and try again"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

