import Eyebrow from '../Eyebrow/Eyebrow'
import styles from './SectionHeading.module.css'

type Align = 'left' | 'center'
type Tone = 'dark' | 'light'

interface SectionHeadingProps {
  title: string
  eyebrow?: string
  align?: Align
  tone?: Tone
}

function SectionHeading({ title, eyebrow, align = 'left', tone = 'dark' }: SectionHeadingProps) {
  return (
    <div className={styles.heading} data-align={align}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className={styles.title} data-tone={tone}>
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
