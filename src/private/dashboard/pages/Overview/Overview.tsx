import { Link } from 'react-router';
import styles from './Overview.module.css';

const sections = [
  {
    to: '/dashboard/categorias',
    title: 'Categorías',
    description: 'Crea y organiza las categorías de accesorios.',
  },
  {
    to: '/dashboard/materiales',
    title: 'Materiales',
    description: 'Administra los materiales disponibles.',
  },
  {
    to: '/dashboard/accesorios',
    title: 'Accesorios',
    description: 'Gestiona el catálogo completo de accesorios.',
  },
];

function Overview() {
  return (
    <div className={styles.overview}>
      <h1 className={styles.heading}>Panel de administración</h1>
      <p className={styles.description}>Elige qué quieres gestionar hoy.</p>
      <div className={styles.grid}>
        {sections.map((section) => (
          <Link key={section.to} to={section.to} className={styles.card}>
            <h2 className={styles.cardTitle}>{section.title}</h2>
            <p className={styles.cardDescription}>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Overview;
