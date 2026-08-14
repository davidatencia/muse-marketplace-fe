import type { Stat } from '@storefront/types/content'
import styles from './Stats.module.css'

interface StatsProps {
  stats: Stat[]
}

function Stats({ stats }: StatsProps) {
  return (
    <section className={styles.stats} aria-label="Estadísticas">
      <ul className={styles.list}>
        {stats.map((stat) => (
          <li key={stat.label} className={styles.item}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Stats
