import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '@shared/components/ui/Button/Button';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import type {
  NameResource,
  NameResourceQueries,
} from '@private/dashboard/api/nameResourceQueries';
import styles from './NameResourceManager.module.css';

interface NameResourceManagerProps {
  heading: string;
  description: string;
  singularLabel: string;
  loadErrorMessage: string;
  resource: NameResourceQueries;
}

function NameResourceManager({
  heading,
  description,
  singularLabel,
  loadErrorMessage,
  resource,
}: NameResourceManagerProps) {
  const { query, createMutation, updateMutation, removeMutation } = resource;
  const items = query.data ?? [];
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const error = createMutation.error
    ? getErrorMessage(createMutation.error, `No se pudo crear ${singularLabel}`)
    : updateMutation.error
      ? getErrorMessage(
          updateMutation.error,
          `No se pudo actualizar ${singularLabel}`,
        )
      : removeMutation.error
        ? getErrorMessage(
            removeMutation.error,
            `No se pudo eliminar ${singularLabel}`,
          )
        : query.error
          ? getErrorMessage(query.error, loadErrorMessage)
          : null;

  // Only the latest action's error should be visible.
  function resetErrors() {
    createMutation.reset();
    updateMutation.reset();
    removeMutation.reset();
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;

    resetErrors();
    createMutation.mutate({ name }, { onSuccess: () => setNewName('') });
  }

  function startEditing(item: NameResource) {
    setEditingId(item.id);
    setEditingName(item.name);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingName('');
  }

  function handleUpdate(id: number) {
    const name = editingName.trim();
    if (!name) return;

    resetErrors();
    updateMutation.mutate({ id, name });
    cancelEditing();
  }

  function handleDelete(id: number) {
    if (!window.confirm(`¿Eliminar ${singularLabel}?`)) return;

    resetErrors();
    removeMutation.mutate(id);
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
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Agregando...' : 'Agregar'}
        </Button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {query.isPending ? null : items.length === 0 ? (
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
