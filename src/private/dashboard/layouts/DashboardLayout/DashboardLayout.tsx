import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import Button from '@shared/components/ui/Button/Button';
import { clearTokens } from '@shared/api/tokenStorage';
import logo from '@shared/assets/logos/logo-mark.png';
import styles from './DashboardLayout.module.css';
import {
  clearUserInformation,
  getUserName,
} from '@/shared/api/userInformationStorage';

const navItems = [
  { to: '/dashboard/categorias', label: 'Categorías' },
  { to: '/dashboard/materiales', label: 'Materiales' },
  { to: '/dashboard/accesorios', label: 'Accesorios' },
];

function linkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

function DashboardLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogout() {
    closeMenu();
    clearTokens();
    clearUserInformation();
    navigate('/login');
  }

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src={logo} alt="Musé" className={styles.logo} />
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="dashboard-mobile-nav"
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

        <nav className={styles.nav}>
          <NavLink to="/dashboard" end className={linkClassName}>
            Inicio
          </NavLink>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.logoutWrap}>
          <h3 className={styles.userName}>{getUserName()}</h3>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>

        {isMenuOpen && (
          <nav id="dashboard-mobile-nav" className={styles.mobileNav}>
            <NavLink
              to="/dashboard"
              end
              className={linkClassName}
              onClick={closeMenu}
            >
              Inicio
            </NavLink>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClassName}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <Button variant="outline" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </nav>
        )}
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
