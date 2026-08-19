import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import AccessoryForm from '@private/dashboard/components/AccessoryForm/AccessoryForm';
import type { AccessoryFormValues } from '@private/dashboard/components/AccessoryForm/AccessoryForm';
import { createAccessory, updateAccessory } from '@private/dashboard/api/accessoriesApi';
import { getAccessory } from '@shared/api/accessoriesApi';
import { getCategories } from '@private/dashboard/api/categoriesApi';
import { getMaterials } from '@private/dashboard/api/materialsApi';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import type { Category } from '@private/dashboard/types/category';
import type { Material } from '@private/dashboard/types/material';
import styles from './AccessoryFormPage.module.css';

function AccessoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [initialValues, setInitialValues] = useState<Partial<AccessoryFormValues> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [categoriesData, materialsData] = await Promise.all([
          getCategories(),
          getMaterials(),
        ]);
        setCategories(categoriesData);
        setMaterials(materialsData);

        if (id) {
          const accessory = await getAccessory(id);
          const category = categoriesData.find(
            (item) => item.name === accessory.category,
          );
          const materialIds = materialsData
            .filter((material) => accessory.materials.includes(material.name))
            .map((material) => String(material.id));

          setInitialValues({
            name: accessory.name,
            description: accessory.description,
            img: accessory.img,
            categoryId: category ? String(category.id) : '',
            materialIds,
            handmade: accessory.handmade,
            highlighted: accessory.highlighted,
            price: String(accessory.price),
            stock: String(accessory.stock),
            rating: accessory.rating ? String(accessory.rating) : '',
          });
        }
      } catch (err) {
        setError(
          getErrorMessage(err, 'No se pudo cargar la información del accesorio'),
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(values: AccessoryFormValues) {
    setIsSubmitting(true);
    setError(null);

    const basePayload = {
      name: values.name.trim(),
      description: values.description.trim(),
      img: values.img.trim(),
      category_id: Number(values.categoryId),
      handmade: values.handmade,
      highlighted: values.highlighted,
      price: Number(values.price),
      stock: Number(values.stock),
      rating: values.rating ? Number(values.rating) : null,
      materials: values.materialIds.map(Number),
    };

    try {
      if (id) {
        await updateAccessory(id, basePayload);
      } else {
        await createAccessory({ ...basePayload, available: values.available });
      }
      navigate('/dashboard/accesorios');
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo guardar el accesorio'));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p className={styles.status}>Cargando...</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>
        {isEditMode ? 'Editar accesorio' : 'Nuevo accesorio'}
      </h1>
      {error && <p className={styles.error}>{error}</p>}
      <AccessoryForm
        mode={isEditMode ? 'edit' : 'create'}
        categories={categories}
        materials={materials}
        initialValues={initialValues ?? undefined}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/dashboard/accesorios')}
      />
    </div>
  );
}

export default AccessoryFormPage;
