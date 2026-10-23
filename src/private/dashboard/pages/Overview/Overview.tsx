import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useCategories } from '@private/dashboard/api/categoriesQueries';
import { useMaterials } from '@private/dashboard/api/materialsQueries';
import {
  AlertIcon,
  BoxIcon,
  CheckIcon,
  ChevronRightIcon,
  GemIcon,
  LayersIcon,
  PlusIcon,
  StoreIcon,
  TagIcon,
  WalletIcon,
} from '@private/dashboard/components/ui/icons';
import PageHeader from '@private/dashboard/components/ui/PageHeader/PageHeader';
import StockPill from '@private/dashboard/components/ui/StockPill/StockPill';
import ui from '@private/dashboard/styles/ui.module.css';
import {
  getStockStatus,
  LOW_STOCK_THRESHOLD,
} from '@private/dashboard/utils/stock';
import { useAccessories } from '@shared/api/accessoriesQueries';
import { getUserName } from '@shared/api/userInformationStorage';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import { formatCurrency } from '@shared/utils/formatCurrency';
import styles from './Overview.module.css';

const ATTENTION_LIMIT = 6;

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

interface StatProps {
  label: string;
  value: ReactNode;
  hint: string;
  icon: ReactNode;
  tone: 'accent' | 'olive' | 'warning' | 'danger';
}

function Stat({ label, value, hint, icon, tone }: StatProps) {
  return (
    <div className={`${ui.card} ${styles.stat}`} data-tone={tone}>
      <span className={styles.statIcon}>{icon}</span>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statHint}>{hint}</p>
    </div>
  );
}

function Overview() {
  const { data: accessories = [] } = useAccessories();
  const { data: categories = [] } = useCategories();
  const { data: materials = [] } = useMaterials();

  const firstName = getUserName()?.split(' ')[0];
  const today = dateFormatter.format(new Date());

  const totalUnits = accessories.reduce((sum, item) => sum + item.stock, 0);
  const inventoryValue = accessories.reduce(
    (sum, item) => sum + item.price * Math.max(item.stock, 0),
    0,
  );
  const featuredCount = accessories.filter((item) => item.highlighted).length;
  const outOfStock = accessories.filter(
    (item) => getStockStatus(item.stock) === 'out',
  );
  const lowStock = accessories.filter(
    (item) => getStockStatus(item.stock) === 'low',
  );
  const needsAttention = [...outOfStock, ...lowStock]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, ATTENTION_LIMIT);

  const shortcuts = [
    {
      to: '/dashboard/accesorios',
      icon: <GemIcon />,
      title: 'Accesorios',
      meta: `${accessories.length} en catálogo`,
    },
    {
      to: '/dashboard/categorias',
      icon: <TagIcon />,
      title: 'Categorías',
      meta: `${categories.length} registradas`,
    },
    {
      to: '/dashboard/materiales',
      icon: <LayersIcon />,
      title: 'Materiales',
      meta: `${materials.length} registrados`,
    },
  ];

  return (
    <div className={styles.page}>
      <PageHeader
        title={firstName ? `Hola, ${firstName}` : 'Panel de administración'}
        description={`Este es el resumen de tu tienda · ${today}`}
        actions={
          <Link to="/dashboard/accesorios/nuevo" className={styles.primaryLink}>
            <PlusIcon size={16} />
            Nuevo accesorio
          </Link>
        }
      />

      <section className={styles.stats} aria-label="Resumen del inventario">
        <Stat
          label="Productos"
          value={accessories.length}
          hint={
            featuredCount === 1 ? '1 destacado' : `${featuredCount} destacados`
          }
          icon={<GemIcon />}
          tone="accent"
        />
        <Stat
          label="Valor del inventario"
          value={formatCurrency(inventoryValue)}
          hint={
            totalUnits === 1 ? '1 unidad en stock' : `${totalUnits} unidades en stock`
          }
          icon={<WalletIcon />}
          tone="olive"
        />
        <Stat
          label="Stock bajo"
          value={lowStock.length}
          hint={`${LOW_STOCK_THRESHOLD} unidades o menos`}
          icon={<BoxIcon />}
          tone="warning"
        />
        <Stat
          label="Agotados"
          value={outOfStock.length}
          hint="No se pueden comprar"
          icon={<AlertIcon />}
          tone="danger"
        />
      </section>

      <div className={styles.columns}>
        <section className={ui.card}>
          <header className={ui.cardHeader}>
            <div>
              <h2 className={ui.cardTitle}>Requieren atención</h2>
              <p className={ui.cardSubtitle}>
                Productos agotados o con pocas unidades
              </p>
            </div>
            {outOfStock.length + lowStock.length > ATTENTION_LIMIT && (
              <Link to="/dashboard/accesorios" className={styles.seeAll}>
                Ver todos
              </Link>
            )}
          </header>

          {needsAttention.length === 0 ? (
            <div className={ui.empty}>
              <span className={ui.emptyIcon}>
                <CheckIcon size={22} />
              </span>
              <p className={ui.emptyTitle}>Todo el inventario está en orden</p>
              <p className={ui.emptyText}>
                Ningún producto está agotado ni con stock bajo.
              </p>
            </div>
          ) : (
            <ul className={styles.attentionList}>
              {needsAttention.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/dashboard/accesorios/${item.id}/editar`}
                    className={styles.attentionItem}
                  >
                    <span className={styles.thumb}>
                      <ImagePlaceholder label={item.name} src={item.img} />
                    </span>
                    <span className={styles.attentionInfo}>
                      <span className={styles.attentionName}>{item.name}</span>
                      <span className={styles.attentionMeta}>
                        {item.category}
                      </span>
                    </span>
                    <StockPill stock={item.stock} />
                    <ChevronRightIcon className={styles.chevron} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={ui.card}>
          <header className={ui.cardHeader}>
            <h2 className={ui.cardTitle}>Accesos rápidos</h2>
          </header>
          <ul className={styles.shortcuts}>
            {shortcuts.map((shortcut) => (
              <li key={shortcut.to}>
                <Link to={shortcut.to} className={styles.shortcut}>
                  <span className={styles.shortcutIcon}>{shortcut.icon}</span>
                  <span className={styles.attentionInfo}>
                    <span className={styles.attentionName}>
                      {shortcut.title}
                    </span>
                    <span className={styles.attentionMeta}>
                      {shortcut.meta}
                    </span>
                  </span>
                  <ChevronRightIcon className={styles.chevron} />
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/productos"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shortcut}
              >
                <span className={styles.shortcutIcon}>
                  <StoreIcon />
                </span>
                <span className={styles.attentionInfo}>
                  <span className={styles.attentionName}>Ver catálogo</span>
                  <span className={styles.attentionMeta}>
                    Como lo ven tus clientes
                  </span>
                </span>
                <ChevronRightIcon className={styles.chevron} />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Overview;
