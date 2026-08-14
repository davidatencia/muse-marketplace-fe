import logo from '@shared/assets/logos/logo-mark.png';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <img src={logo} alt="Musé" className={styles.logo} />
      <span className={styles.label}>Loading…</span>
    </div>
  );
}

export default Loader;
