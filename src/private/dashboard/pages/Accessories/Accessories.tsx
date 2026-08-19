import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Button from '@shared/components/ui/Button/Button';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import { deleteAccessory } from '@private/dashboard/api/accessoriesApi';
import { getAccessories } from '@shared/api/accessoriesApi';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import type { Accessory } from '@shared/types/accessory';
import styles from './Accessories.module.css';

function Accessories() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getAccessories()
      .then((data) => {
        if (!ignore) setAccessories(data);
      })
      .catch((err) => {
        if (!ignore) {
          setError(getErrorMessage(err, 'No se pudieron cargar los accesorios'));
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm('¿Eliminar este accesorio?')) return;

    setError(null);
    try {
      await deleteAccessory(id);
      setAccessories((current) => current.filter((accessory) => accessory.id !== id));
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo eliminar el accesorio'));
    }
  }

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

      {error && <p className={styles.error}>{error}</p>}

      {isLoading ? null : accessories.length === 0 ? (
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
