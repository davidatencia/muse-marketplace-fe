import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '@shared/components/ui/Button/Button';
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
  const [values, setValues] = useState<AccessoryFormValues>({
    ...emptyValues,
    ...initialValues,
  });

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
    onSubmit(values);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          className={styles.input}
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
          className={styles.textarea}
          rows={4}
          value={values.description}
          onChange={(event) => updateField('description', event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="img">
          URL de imagen
        </label>
        <input
          id="img"
          type="url"
          className={styles.input}
          value={values.img}
          onChange={(event) => updateField('img', event.target.value)}
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="category">
            Categoría
          </label>
          <select
            id="category"
            className={styles.input}
            value={values.categoryId}
            onChange={(event) => updateField('categoryId', event.target.value)}
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
            className={styles.input}
            value={values.rating}
            onChange={(event) => updateField('rating', event.target.value)}
          >
            <option value="">Sin calificación</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="price">
            Precio
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            className={styles.input}
            value={values.price}
            onChange={(event) => updateField('price', event.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            className={styles.input}
            value={values.stock}
            onChange={(event) => updateField('stock', event.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Materiales</span>
        <div className={styles.checkboxGroup}>
          {materials.map((material) => (
            <label key={material.id} className={styles.checkboxOption}>
              <input
                type="checkbox"
                checked={values.materialIds.includes(String(material.id))}
                onChange={() => toggleMaterial(String(material.id))}
              />
              {material.name}
            </label>
          ))}
          {materials.length === 0 && (
            <p className={styles.hint}>No hay materiales registrados</p>
          )}
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxOption}>
          <input
            type="checkbox"
            checked={values.handmade}
            onChange={(event) => updateField('handmade', event.target.checked)}
          />
          Hecho a mano
        </label>
        <label className={styles.checkboxOption}>
          <input
            type="checkbox"
            checked={values.highlighted}
            onChange={(event) => updateField('highlighted', event.target.checked)}
          />
          Destacado
        </label>
        {mode === 'create' && (
          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              checked={values.available}
              onChange={(event) => updateField('available', event.target.checked)}
            />
            Disponible
          </label>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
}

export default AccessoryForm;
