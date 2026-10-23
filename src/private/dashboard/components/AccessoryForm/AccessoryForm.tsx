import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '@shared/components/ui/Button/Button';
import ImagePlaceholder from '@shared/components/ui/ImagePlaceholder/ImagePlaceholder';
import { CheckIcon, ImageIcon } from '@private/dashboard/components/ui/icons';
import ui from '@private/dashboard/styles/ui.module.css';
import {
  getChangedFields,
  hasChanges,
  toAccessoryPayload,
} from '@private/dashboard/utils/accessoryPayload';
import type { Category } from '@private/dashboard/types/category';
import type { Material } from '@private/dashboard/types/material';
import styles from './AccessoryForm.module.css';

export interface AccessoryFormValues {
  name: string;
  description: string;
  img: string;
  categoryId: string;
  materialIds: string[];
  handmade: boolean;
  highlighted: boolean;
  available: boolean;
  price: string;
  stock: string;
  rating: string;
}

const emptyValues: AccessoryFormValues = {
  name: '',
  description: '',
  img: '',
  categoryId: '',
  materialIds: [],
  handmade: false,
  highlighted: false,
  available: true,
  price: '',
  stock: '',
  rating: '',
};

interface AccessoryFormProps {
  mode: 'create' | 'edit';
  categories: Category[];
  materials: Material[];
  initialValues?: Partial<AccessoryFormValues>;
  isSubmitting: boolean;
  onSubmit: (values: AccessoryFormValues) => void;
  onCancel: () => void;
}

function AccessoryForm({
  mode,
  categories,
  materials,
  initialValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: AccessoryFormProps) {
  const [initial] = useState<AccessoryFormValues>(() => ({
    ...emptyValues,
    ...initialValues,
  }));
  const [values, setValues] = useState<AccessoryFormValues>(initial);

  const isDirty =
    mode === 'create' ||
    hasChanges(
      getChangedFields(toAccessoryPayload(values), toAccessoryPayload(initial)),
    );

  function updateField<K extends keyof AccessoryFormValues>(
    field: K,
    value: AccessoryFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function toggleMaterial(materialId: string) {
    setValues((current) => ({
      ...current,
      materialIds: current.materialIds.includes(materialId)
        ? current.materialIds.filter((id) => id !== materialId)
        : [...current.materialIds, materialId],
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isDirty) return;
    onSubmit(values);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.layout}>
        <div className={styles.column}>
          <section className={ui.card}>
            <header className={ui.cardHeader}>
              <div>
                <h2 className={ui.cardTitle}>Información general</h2>
                <p className={ui.cardSubtitle}>
                  Lo que verán tus clientes en el catálogo.
                </p>
              </div>
            </header>
            <div className={`${ui.cardBody} ${styles.fields}`}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  className={ui.input}
                  placeholder="Ej. Collar de perlas con dije"
                  value={values.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="description">
                  Descripción
                </label>
                <textarea
                  id="description"
                  className={`${ui.input} ${styles.textarea}`}
                  rows={4}
                  placeholder="Materiales, medidas, detalles que la hacen especial…"
                  value={values.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                  required
                />
              </div>
            </div>
          </section>

          <section className={ui.card}>
            <header className={ui.cardHeader}>
              <h2 className={ui.cardTitle}>Precio e inventario</h2>
            </header>
            <div className={`${ui.cardBody} ${styles.row}`}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="price">
                  Precio (COP)
                </label>
                <div className={styles.prefixed}>
                  <span className={styles.prefix} aria-hidden="true">
                    $
                  </span>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    className={ui.input}
                    value={values.price}
                    onChange={(event) => updateField('price', event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="stock">
                  Unidades en stock
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  className={ui.input}
                  value={values.stock}
                  onChange={(event) => updateField('stock', event.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          <section className={ui.card}>
            <header className={ui.cardHeader}>
              <div>
                <h2 className={ui.cardTitle}>Materiales</h2>
                <p className={ui.cardSubtitle}>Selecciona todos los que apliquen.</p>
              </div>
            </header>
            <div className={ui.cardBody}>
              {materials.length === 0 ? (
                <p className={styles.hint}>No hay materiales registrados.</p>
              ) : (
                <div className={styles.chips} role="group" aria-label="Materiales">
                  {materials.map((material) => {
                    const id = String(material.id);
                    const checked = values.materialIds.includes(id);

                    return (
                      <label
                        key={material.id}
                        className={styles.chip}
                        data-checked={checked}
                      >
                        <input
                          type="checkbox"
                          className={styles.chipInput}
                          checked={checked}
                          onChange={() => toggleMaterial(id)}
                        />
                        {checked && <CheckIcon size={14} />}
                        {material.name}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className={styles.column}>
          <section className={ui.card}>
            <header className={ui.cardHeader}>
              <h2 className={ui.cardTitle}>Imagen</h2>
            </header>
            <div className={`${ui.cardBody} ${styles.fields}`}>
              <div className={styles.preview}>
                {values.img ? (
                  <ImagePlaceholder
                    key={values.img}
                    src={values.img}
                    label="Vista previa"
                    ratio="1 / 1"
                  />
                ) : (
                  <div className={styles.previewEmpty}>
                    <ImageIcon size={28} />
                    <span>La vista previa aparecerá aquí</span>
                  </div>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="img">
                  URL de la imagen
                </label>
                <input
                  id="img"
                  type="url"
                  className={ui.input}
                  placeholder="https://…"
                  value={values.img}
                  onChange={(event) => updateField('img', event.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          <section className={ui.card}>
            <header className={ui.cardHeader}>
              <h2 className={ui.cardTitle}>Organización</h2>
            </header>
            <div className={`${ui.cardBody} ${styles.fields}`}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="category">
                  Categoría
                </label>
                <select
                  id="category"
                  className={`${ui.input} ${styles.select}`}
                  value={values.categoryId}
                  onChange={(event) =>
                    updateField('categoryId', event.target.value)
                  }
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="rating">
                  Calificación
                </label>
                <select
                  id="rating"
                  className={`${ui.input} ${styles.select}`}
                  value={values.rating}
                  onChange={(event) => updateField('rating', event.target.value)}
                >
                  <option value="">Sin calificación</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {'★'.repeat(value)} ({value})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className={ui.card}>
            <header className={ui.cardHeader}>
              <h2 className={ui.cardTitle}>Visibilidad</h2>
            </header>
            <div className={styles.switches}>
              <label className={styles.switchRow}>
                <span>
                  <span className={styles.switchTitle}>Destacado</span>
                  <span className={styles.switchHint}>
                    Muestra la etiqueta ★ Destacado en la tienda.
                  </span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  className={styles.switch}
                  checked={values.highlighted}
                  onChange={(event) =>
                    updateField('highlighted', event.target.checked)
                  }
                />
              </label>
              <label className={styles.switchRow}>
                <span>
                  <span className={styles.switchTitle}>Hecho a mano</span>
                  <span className={styles.switchHint}>
                    Añade la etiqueta “Hecho a mano”.
                  </span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  className={styles.switch}
                  checked={values.handmade}
                  onChange={(event) =>
                    updateField('handmade', event.target.checked)
                  }
                />
              </label>
              {mode === 'create' && (
                <label className={styles.switchRow}>
                  <span>
                    <span className={styles.switchTitle}>Disponible</span>
                    <span className={styles.switchHint}>
                      Permite que el producto se pueda comprar.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    role="switch"
                    className={styles.switch}
                    checked={values.available}
                    onChange={(event) =>
                      updateField('available', event.target.checked)
                    }
                  />
                </label>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className={styles.actions}>
        {!isDirty && (
          <p className={styles.actionsHint} role="status">
            Sin cambios por guardar
          </p>
        )}
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" size="sm" disabled={isSubmitting || !isDirty}>
          {isSubmitting
            ? 'Guardando...'
            : mode === 'create'
              ? 'Crear accesorio'
              : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
}

export default AccessoryForm;
