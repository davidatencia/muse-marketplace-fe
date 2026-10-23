import { useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import {
  GemIcon,
  HomeIcon,
  LayersIcon,
  LogOutIcon,
  MenuIcon,
  StoreIcon,
  TagIcon,
  XIcon,
} from '@private/dashboard/components/ui/icons';
import { clearSession } from '@shared/api/session';
import { getUserName } from '@shared/api/userInformationStorage';
import logo from '@shared/assets/logos/logo-mark.png';
import styles from './DashboardLayout.module.css';

interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  end?: boolean;
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Inicio', icon: HomeIcon, end: true },
  { to: '/dashboard/accesorios', label: 'Accesorios', icon: GemIcon },
  { to: '/dashboard/categorias', label: 'Categorías', icon: TagIcon },
  { to: '/dashboard/materiales', label: 'Materiales', icon: LayersIcon },
];

function linkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

function getInitials(name: string | undefined) {
  if (!name) return '?';
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function DashboardLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = getUserName();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogout() {
    closeMenu();
    clearSession();
    queryClient.clear();
    navigate('/login');
  }

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar} data-open={isMenuOpen}>
        <div className={styles.sidebarHeader}>
          <Link to="/dashboard" onClick={closeMenu}>
            <img src={logo} alt="Musé" className={styles.logo} />
          </Link>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="dashboard-nav"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>

        <div id="dashboard-nav" className={styles.navArea}>
          <p className={styles.navLabel}>Gestión</p>
          <nav className={styles.nav}>
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={linkClassName}
                onClick={closeMenu}
              >
                <Icon size={19} />
                {label}
              </NavLink>
            ))}
          </nav>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.storeLink}
          >
            <StoreIcon size={19} />
            Ver tienda
          </a>

          <div className={styles.user}>
            <span className={styles.avatar} aria-hidden="true">
              {getInitials(userName)}
            </span>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{userName ?? 'Administrador'}</p>
              <p className={styles.userRole}>Administración</p>
            </div>
            <button
              type="button"
              className={styles.logout}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
              onClick={handleLogout}
            >
              <LogOutIcon size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className={styles.content}>
        <div className={styles.contentInner}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
