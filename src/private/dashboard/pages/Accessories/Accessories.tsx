import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Button from '@shared/components/ui/Button/Button';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import { useDeleteAccessory } from '@private/dashboard/api/accessoriesQueries';
import { categoriesQueryOptions } from '@private/dashboard/api/categoriesQueries';
import { materialsQueryOptions } from '@private/dashboard/api/materialsQueries';
import {
  AlertIcon,
  GemIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from '@private/dashboard/components/ui/icons';
import PageHeader from '@private/dashboard/components/ui/PageHeader/PageHeader';
import StockPill from '@private/dashboard/components/ui/StockPill/StockPill';
import ui from '@private/dashboard/styles/ui.module.css';
import {
  accessoryQueryOptions,
  useAccessories,
} from '@shared/api/accessoriesQueries';
import { formatCurrency } from '@shared/utils/formatCurrency';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import styles from './Accessories.module.css';

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

function Accessories() {
  const queryClient = useQueryClient();
  const {
    data: accessories = [],
    isPending,
    error: loadError,
  } = useAccessories();
  const deleteMutation = useDeleteAccessory();
  const [search, setSearch] = useState('');

  function handleDelete(id: string, name: string) {
    if (!window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    deleteMutation.mutate(id);
  }

  function prefetchEditForm(id: string) {
    queryClient.prefetchQuery(accessoryQueryOptions(id));
    queryClient.prefetchQuery(categoriesQueryOptions());
    queryClient.prefetchQuery(materialsQueryOptions());
  }

  const errorMessage = deleteMutation.error
    ? getErrorMessage(deleteMutation.error, 'No se pudo eliminar el accesorio')
    : loadError
      ? getErrorMessage(loadError, 'No se pudieron cargar los accesorios')
      : null;

  const query = normalize(search.trim());
  const visibleAccessories = query
    ? accessories.filter((accessory) =>
        [accessory.name, accessory.category, ...accessory.materials].some(
          (value) => normalize(value).includes(query),
        ),
      )
    : accessories;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Accesorios"
        description="Administra el catálogo de accesorios de la tienda."
        actions={
          <Button href="/dashboard/accesorios/nuevo" size="sm">
            <PlusIcon size={16} />
            Nuevo accesorio
          </Button>
        }
      />

      {errorMessage && (
        <p className={ui.alert} role="alert">
          <AlertIcon />
          {errorMessage}
        </p>
      )}

      <section className={ui.card}>
        <div className={styles.toolbar}>
          <label className={styles.search}>
            <SearchIcon className={styles.searchIcon} />
            <span className={styles.srOnly}>Buscar accesorios</span>
            <input
              type="search"
              className={`${ui.input} ${styles.searchInput}`}
              placeholder="Buscar accesorios…"
              title="Busca por nombre, categoría o material"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          {!isPending && (
            <p className={styles.count}>
              {visibleAccessories.length === accessories.length
                ? `${accessories.length} ${accessories.length === 1 ? 'producto' : 'productos'}`
                : `${visibleAccessories.length} de ${accessories.length} productos`}
            </p>
          )}
        </div>

        {isPending ? null : accessories.length === 0 ? (
          <div className={ui.empty}>
            <span className={ui.emptyIcon}>
              <GemIcon size={22} />
            </span>
            <p className={ui.emptyTitle}>Todavía no hay accesorios</p>
            <p className={ui.emptyText}>
              Crea el primero para que aparezca en la tienda.
            </p>
          </div>
        ) : visibleAccessories.length === 0 ? (
          <div className={ui.empty}>
            <span className={ui.emptyIcon}>
              <SearchIcon size={22} />
            </span>
            <p className={ui.emptyTitle}>Sin resultados</p>
            <p className={ui.emptyText}>
              Ningún accesorio coincide con “{search.trim()}”.
            </p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th className={styles.numeric}>Precio</th>
                <th>Inventario</th>
                <th>Materiales</th>
                <th>
                  <span className={styles.srOnly}>Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleAccessories.map((accessory) => (
                <tr key={accessory.id}>
                  <td>
                    <div className={styles.product}>
                      <span className={styles.thumb}>
                        <ImagePlaceholder
                          label={accessory.name}
                          src={accessory.img}
                          ratio="1 / 1"
                        />
                      </span>
                      <div className={styles.productInfo}>
                        <span className={styles.productName}>
                          {accessory.name}
                        </span>
                        <span className={styles.productFlags}>
                          {accessory.highlighted && (
                            <span className={styles.flagFeatured}>
                              ★ Destacado
                            </span>
                          )}
                          {accessory.handmade && (
                            <span className={styles.flag}>Hecho a mano</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td data-label="Categoría">
                    <span className={ui.chip}>{accessory.category}</span>
                  </td>
                  <td data-label="Precio" className={styles.numeric}>
                    <span className={styles.price}>
                      {formatCurrency(accessory.price)}
                    </span>
                  </td>
                  <td data-label="Inventario">
                    <StockPill stock={accessory.stock} />
                  </td>
                  <td data-label="Materiales" className={styles.materials}>
                    {accessory.materials.join(', ') || '—'}
                  </td>
                  <td className={styles.actionsCell}>
                    <Link
                      to={`/dashboard/accesorios/${accessory.id}/editar`}
                      className={ui.iconButton}
                      aria-label={`Editar ${accessory.name}`}
                      title="Editar"
                      onMouseEnter={() => prefetchEditForm(accessory.id)}
                      onFocus={() => prefetchEditForm(accessory.id)}
                    >
                      <PencilIcon />
                    </Link>
                    <button
                      type="button"
                      className={`${ui.iconButton} ${ui.iconButtonDanger}`}
                      aria-label={`Eliminar ${accessory.name}`}
                      title="Eliminar"
                      onClick={() => handleDelete(accessory.id, accessory.name)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Accessories;
