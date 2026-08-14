import { Link } from 'react-router'
import type { ContactDetails, NavLink } from '@storefront/types/content'
import styles from './Footer.module.css'

interface FooterProps {
  links: NavLink[]
  contact: ContactDetails
}

function Footer({ links, contact }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>Musé</p>
          <p className={styles.tagline}>Accesorios hechos a mano</p>
        </div>
        <nav>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('/') ? (
                  <Link to={link.href}>{link.label}</Link>
                ) : (
                  <a href={link.href}>{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.contact}>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
          <p>{contact.address}</p>
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} Musé. Todos los derechos reservados.</p>
      <p className={styles.credit}>
        Desarrollado por{' '}
        <a href="https://www.linkedin.com/in/david-atencia/" target="_blank" rel="noopener noreferrer">
          David Atencia
        </a>{' '}
        ·{' '}
        <a href="https://github.com/davidatencia" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  )
}

export default Footer
