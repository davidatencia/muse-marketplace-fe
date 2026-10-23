import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRightIcon } from '@private/dashboard/components/ui/icons';
import styles from './PageHeader.module.css';

interface Breadcrumb {
  label: string;
  to: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: Breadcrumb;
  actions?: ReactNode;
}

function PageHeader({ title, description, breadcrumb, actions }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        {breadcrumb && (
          <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
            <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
            <ChevronRightIcon size={14} />
            <span aria-current="page">{title}</span>
          </nav>
        )}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}

export default PageHeader;
