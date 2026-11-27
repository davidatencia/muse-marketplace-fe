import type { Promotion } from '@shared/types/promotion';
import styles from './AnnouncementBar.module.css';

interface AnnouncementBarProps {
  promotion: Promotion | null;
}

function AnnouncementBar({ promotion }: AnnouncementBarProps) {
  if (!promotion) return null;

  return (
    <aside className={styles.bar} aria-label="Promoción activa">
      <p className={styles.message}>
        <strong className={styles.discount}>{promotion.discount}% OFF</strong>
        <span className={styles.description}>{promotion.description}</span>
      </p>
    </aside>
  );
}

export default AnnouncementBar;
