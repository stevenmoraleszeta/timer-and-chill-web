import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { ACTIVITIES } from '../constants'
import styles from './AnimatedText.module.css'

export const AnimatedText: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement>(null)
  const typedInstanceRef = useRef<Typed | null>(null)

  useEffect(() => {
    if (typedRef.current) {
      typedInstanceRef.current = new Typed(typedRef.current, {
        strings: ACTIVITIES,
        loop: true,
        typeSpeed: 150,
        backSpeed: 150,
        startDelay: 300,
        backDelay: 3000,
        cursorChar: '|',
        contentType: 'html',
      })
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className={styles.container} aria-live="polite">
      <span ref={typedRef} className={styles.typed} aria-label="Current activity" />
    </div>
  )
}

