import { Link } from 'react-router'
import type { ServiceItem } from '@storefront/types/content'
import SectionHeading from '@shared/components/ui/SectionHeading/SectionHeading'
import styles from './Services.module.css'

interface ServicesProps {
  heading: string
  items: ServiceItem[]
  eyebrow?: string
}

function Services({ heading, items, eyebrow }: ServicesProps) {
  return (
    <section id="productos" className={styles.services}>
      <div className={styles.inner}>
        <SectionHeading eyebrow={eyebrow} title={heading} align="center" />
        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.title}>
              <Link to={`/productos?categoria=${encodeURIComponent(item.title)}`} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
