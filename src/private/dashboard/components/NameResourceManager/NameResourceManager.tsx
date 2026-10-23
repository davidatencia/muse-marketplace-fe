import { useState } from 'react';
import type { FormEvent, KeyboardEvent, ReactNode } from 'react';
import Button from '@shared/components/ui/Button/Button';
import {
  AlertIcon,
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TagIcon,
  TrashIcon,
  XIcon,
} from '@private/dashboard/components/ui/icons';
import PageHeader from '@private/dashboard/components/ui/PageHeader/PageHeader';
import ui from '@private/dashboard/styles/ui.module.css';
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
  icon?: ReactNode;
}

function NameResourceManager({
  heading,
  description,
  singularLabel,
  loadErrorMessage,
  resource,
  icon = <TagIcon size={22} />,
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

  function handleUpdate(item: NameResource) {
    const name = editingName.trim();
    if (!name) return;

    if (name === item.name) {
      cancelEditing();
      return;
    }

    resetErrors();
    updateMutation.mutate({ id: item.id, name });
    cancelEditing();
  }

  function handleEditKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    item: NameResource,
  ) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleUpdate(item);
    } else if (event.key === 'Escape') {
      cancelEditing();
    }
  }

  function handleDelete(item: NameResource) {
    if (!window.confirm(`¿Eliminar ${singularLabel} "${item.name}"?`)) return;

    resetErrors();
    removeMutation.mutate(item.id);
  }

  return (
    <div className={styles.page}>
      <PageHeader title={heading} description={description} />

      {error && (
        <p className={ui.alert} role="alert">
          <AlertIcon />
          {error}
        </p>
      )}

      <section className={`${ui.card} ${styles.card}`}>
        <header className={ui.cardHeader}>
          <div>
            <h2 className={ui.cardTitle}>Registros</h2>
            {!query.isPending && (
              <p className={ui.cardSubtitle}>
                {items.length === 1 ? '1 registro' : `${items.length} registros`}
              </p>
            )}
          </div>
        </header>

        <form className={styles.createForm} onSubmit={handleCreate}>
          <input
            className={ui.input}
            placeholder="Escribe un nombre y pulsa Agregar"
            aria-label={`Nombre de ${singularLabel}`}
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            required
          />
          <Button type="submit" size="sm" disabled={createMutation.isPending}>
            <PlusIcon size={16} />
            {createMutation.isPending ? 'Agregando...' : 'Agregar'}
          </Button>
        </form>

        {query.isPending ? null : items.length === 0 ? (
          <div className={ui.empty}>
            <span className={ui.emptyIcon}>{icon}</span>
            <p className={ui.emptyTitle}>Todavía no hay registros</p>
            <p className={ui.emptyText}>
              Agrega el primero con el campo de arriba.
            </p>
          </div>
        ) : (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                {editingId === item.id ? (
                  <>
                    <input
                      className={`${ui.input} ${styles.editInput}`}
                      aria-label={`Nuevo nombre para ${item.name}`}
                      value={editingName}
                      onChange={(event) => setEditingName(event.target.value)}
                      onKeyDown={(event) => handleEditKeyDown(event, item)}
                      autoFocus
                    />
                    <div className={styles.itemActions}>
                      <button
                        type="button"
                        className={`${ui.iconButton} ${styles.confirm}`}
                        aria-label="Guardar"
                        title="Guardar (Enter)"
                        onClick={() => handleUpdate(item)}
                      >
                        <CheckIcon />
                      </button>
                      <button
                        type="button"
                        className={ui.iconButton}
                        aria-label="Cancelar"
                        title="Cancelar (Esc)"
                        onClick={cancelEditing}
                      >
                        <XIcon />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className={styles.itemName}>
                      <span className={styles.dot} aria-hidden="true" />
                      {item.name}
                    </span>
                    <div className={styles.itemActions}>
                      <button
                        type="button"
                        className={ui.iconButton}
                        aria-label={`Editar ${item.name}`}
                        title="Editar"
                        onClick={() => startEditing(item)}
                      >
                        <PencilIcon />
                      </button>
                      <button
                        type="button"
                        className={`${ui.iconButton} ${ui.iconButtonDanger}`}
                        aria-label={`Eliminar ${item.name}`}
                        title="Eliminar"
                        onClick={() => handleDelete(item)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default NameResourceManager;
