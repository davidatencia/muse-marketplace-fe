import { NavLink, Outlet, useNavigate } from 'react-router';
import Button from '@shared/components/ui/Button/Button';
import { clearTokens } from '@shared/api/tokenStorage';
import logo from '@shared/assets/logos/logo-mark.png';
import styles from './DashboardLayout.module.css';

const navItems = [
  { to: '/dashboard/categorias', label: 'Categorías' },
  { to: '/dashboard/materiales', label: 'Materiales' },
  { to: '/dashboard/accesorios', label: 'Accesorios' },
];

function DashboardLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    clearTokens();
    navigate('/login');
  }

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <img src={logo} alt="Musé" className={styles.logo} />
        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            Inicio
          </NavLink>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
