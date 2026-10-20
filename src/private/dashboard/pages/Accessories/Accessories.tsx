import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Button from '@shared/components/ui/Button/Button';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import { useDeleteAccessory } from '@private/dashboard/api/accessoriesQueries';
import { categoriesQueryOptions } from '@private/dashboard/api/categoriesQueries';
import { materialsQueryOptions } from '@private/dashboard/api/materialsQueries';
import {
  accessoryQueryOptions,
  useAccessories,
} from '@shared/api/accessoriesQueries';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import styles from './Accessories.module.css';

function Accessories() {
  const queryClient = useQueryClient();
  const {
    data: accessories = [],
    isPending,
    error: loadError,
  } = useAccessories();
  const deleteMutation = useDeleteAccessory();

  function handleDelete(id: string) {
    if (!window.confirm('¿Eliminar este accesorio?')) return;
    deleteMutation.mutate(id);
  }

  // Warm the cache for the edit form so it opens without a loading state.
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Accesorios</h1>
          <p className={styles.description}>
            Administra el catálogo de accesorios de la tienda.
          </p>
        </div>
        <Button href="/dashboard/accesorios/nuevo">Nuevo accesorio</Button>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {isPending ? null : accessories.length === 0 ? (
        <p className={styles.status}>Todavía no hay accesorios registrados.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Materiales</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accessories.map((accessory) => (
                <tr key={accessory.id}>
                  <td className={styles.imageCell}>
                    <div className={styles.thumb}>
                      <ImagePlaceholder
                        label={accessory.name}
                        src={accessory.img}
                        ratio="1 / 1"
                      />
                    </div>
                  </td>
                  <td>
                    {accessory.name}
                    {accessory.highlighted && (
                      <span className={styles.badge}>Destacado</span>
                    )}
                  </td>
                  <td>{accessory.category}</td>
                  <td>${accessory.price}</td>
                  <td>{accessory.stock}</td>
                  <td>{accessory.materials.join(', ') || '—'}</td>
                  <td className={styles.actionsCell}>
                    <Link
                      to={`/dashboard/accesorios/${accessory.id}/editar`}
                      className={styles.editLink}
                      onMouseEnter={() => prefetchEditForm(accessory.id)}
                      onFocus={() => prefetchEditForm(accessory.id)}
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => handleDelete(accessory.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Accessories;
