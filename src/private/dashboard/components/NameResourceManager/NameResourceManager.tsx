import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import Button from '@shared/components/ui/Button/Button';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import styles from './NameResourceManager.module.css';

interface NameResource {
  id: number;
  name: string;
}

interface NamePayload {
  name: string;
}

interface NameResourceManagerProps {
  heading: string;
  description: string;
  singularLabel: string;
  loadErrorMessage: string;
  fetchAll: () => Promise<NameResource[]>;
  create: (payload: NamePayload) => Promise<unknown>;
  update: (id: number, payload: NamePayload) => Promise<unknown>;
  remove: (id: number) => Promise<unknown>;
}

function NameResourceManager({
  heading,
  description,
  singularLabel,
  loadErrorMessage,
  fetchAll,
  create,
  update,
  remove,
}: NameResourceManagerProps) {
  const [items, setItems] = useState<NameResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setItems(await fetchAll());
    } catch (err) {
      setError(getErrorMessage(err, loadErrorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [fetchAll, loadErrorMessage]);

  useEffect(() => {
    let ignore = false;

    fetchAll()
      .then((data) => {
        if (!ignore) setItems(data);
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err, loadErrorMessage));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [fetchAll, loadErrorMessage]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;

    setIsSaving(true);
    setError(null);
    try {
      await create({ name });
      setNewName('');
      await loadItems();
    } catch (err) {
      setError(getErrorMessage(err, `No se pudo crear ${singularLabel}`));
    } finally {
      setIsSaving(false);
    }
  }

  function startEditing(item: NameResource) {
    setEditingId(item.id);
    setEditingName(item.name);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingName('');
  }

  async function handleUpdate(id: number) {
    const name = editingName.trim();
    if (!name) return;

    setIsSaving(true);
    setError(null);
    try {
      await update(id, { name });
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, name } : item)),
      );
      cancelEditing();
    } catch (err) {
      setError(getErrorMessage(err, `No se pudo actualizar ${singularLabel}`));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm(`¿Eliminar ${singularLabel}?`)) return;

    setError(null);
    try {
      await remove(id);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(getErrorMessage(err, `No se pudo eliminar ${singularLabel}`));
    }
  }

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.description}>{description}</p>
      </div>

      <form className={styles.createForm} onSubmit={handleCreate}>
        <input
          className={styles.input}
          placeholder="Nombre"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
        <Button type="submit" disabled={isSaving}>
          Agregar
        </Button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {isLoading ? null : items.length === 0 ? (
        <p className={styles.status}>Todavía no hay registros.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              {editingId === item.id ? (
                <>
                  <input
                    className={styles.input}
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    autoFocus
                  />
                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() => handleUpdate(item.id)}
                      disabled={isSaving}
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={cancelEditing}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className={styles.itemName}>{item.name}</span>
                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() => startEditing(item)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className={styles.linkButtonDanger}
                      onClick={() => handleDelete(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NameResourceManager;
