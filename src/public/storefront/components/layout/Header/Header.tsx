import { useState } from 'react';
import { Link } from 'react-router';
import logo from '@shared/assets/logos/logo-mark.png';
import type { NavLink } from '@public/storefront/types/content';
import styles from './Header.module.css';

interface HeaderProps {
  links: NavLink[];
}

function Header({ links }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <img src={logo} alt="Musé" className={styles.logo} />
        </Link>

        <nav className={styles.desktopNav}>
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

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <img
            src="https://res.cloudinary.com/iyrl9jhg/image/upload/v1786636102/hamburger-menu.svg"
            alt=""
            aria-hidden="true"
            className={styles.menuIcon}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-menu" className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {links.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('/') ? (
                  <Link to={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
