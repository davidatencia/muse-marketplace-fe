import type { ReactNode } from 'react'
import styles from './Eyebrow.module.css'

type Tone = 'dark' | 'light'

interface EyebrowProps {
  children: ReactNode
  tone?: Tone
}

function Eyebrow({ children, tone = 'dark' }: EyebrowProps) {
  return (
    <span className={styles.eyebrow} data-tone={tone}>
      <span className={styles.sparkle} aria-hidden="true">
        ✦
      </span>
      {children}
      <span className={styles.sparkle} aria-hidden="true">
        ✦
      </span>
    </span>
  )
}

export default Eyebrow
