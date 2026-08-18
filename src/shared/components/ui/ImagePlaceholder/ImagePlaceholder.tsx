import { useState } from 'react'
import styles from './ImagePlaceholder.module.css'

interface ImagePlaceholderProps {
  label: string
  ratio?: string
  src?: string
}

function ImagePlaceholder({ label, ratio = '1 / 1', src }: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false)

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={label}
        className={styles.image}
        style={{ aspectRatio: ratio }}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
      />
    )
  }

  return (
    <div className={styles.placeholder} style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  )
}

export default ImagePlaceholder
