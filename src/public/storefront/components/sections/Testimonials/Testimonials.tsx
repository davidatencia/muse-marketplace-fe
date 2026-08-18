import type { Testimonial } from '@public/storefront/types/content'
import SectionHeading from '@shared/components/ui/SectionHeading/SectionHeading'
import styles from './Testimonials.module.css'

interface TestimonialsProps {
  heading: string
  items: Testimonial[]
  eyebrow?: string
}

function Testimonials({ heading, items, eyebrow }: TestimonialsProps) {
  return (
    <section className={styles.testimonials}>
      <div className={styles.inner}>
        <SectionHeading eyebrow={eyebrow} title={heading} align="center" />
        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.author} className={styles.card}>
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <p className={styles.author}>{item.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials
