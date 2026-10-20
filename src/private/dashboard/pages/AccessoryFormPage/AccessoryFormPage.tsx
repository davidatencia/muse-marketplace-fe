import { useNavigate, useParams } from 'react-router';
import AccessoryForm from '@private/dashboard/components/AccessoryForm/AccessoryForm';
import type { AccessoryFormValues } from '@private/dashboard/components/AccessoryForm/AccessoryForm';
import {
  useCreateAccessory,
  useUpdateAccessory,
} from '@private/dashboard/api/accessoriesQueries';
import { useCategories } from '@private/dashboard/api/categoriesQueries';
import { useMaterials } from '@private/dashboard/api/materialsQueries';
import { useAccessory } from '@shared/api/accessoriesQueries';
import { getErrorMessage } from '@shared/utils/getErrorMessage';
import type { Accessory } from '@shared/types/accessory';
import type { Category } from '@private/dashboard/types/category';
import type { Material } from '@private/dashboard/types/material';
import styles from './AccessoryFormPage.module.css';

function toFormValues(
  accessory: Accessory,
  categories: Category[],
  materials: Material[],
): Partial<AccessoryFormValues> {
  const category = categories.find((item) => item.name === accessory.category);
  const materialIds = materials
    .filter((material) => accessory.materials.includes(material.name))
    .map((material) => String(material.id));

  return {
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
  };
}

function AccessoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const categoriesQuery = useCategories();
  const materialsQuery = useMaterials();
  const accessoryQuery = useAccessory(id);
  const createMutation = useCreateAccessory();
  const updateMutation = useUpdateAccessory();

  const categories = categoriesQuery.data ?? [];
  const materials = materialsQuery.data ?? [];

  const isLoading =
    categoriesQuery.isPending ||
    materialsQuery.isPending ||
    (isEditMode && accessoryQuery.isPending);

  const initialValues = accessoryQuery.data
    ? toFormValues(accessoryQuery.data, categories, materials)
    : undefined;

  const saveError = createMutation.error ?? updateMutation.error;
  const loadError =
    categoriesQuery.error ?? materialsQuery.error ?? accessoryQuery.error;

  const errorMessage = saveError
    ? getErrorMessage(saveError, 'No se pudo guardar el accesorio')
    : loadError
      ? getErrorMessage(loadError, 'No se pudo cargar la información del accesorio')
      : null;

  function goToList() {
    navigate('/dashboard/accesorios');
  }

  function handleSubmit(values: AccessoryFormValues) {
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

    if (id) {
      updateMutation.mutate(
        { id, payload: basePayload },
        { onSuccess: goToList },
      );
    } else {
      createMutation.mutate(
        { ...basePayload, available: values.available },
        { onSuccess: goToList },
      );
    }
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>
        {isEditMode ? 'Editar accesorio' : 'Nuevo accesorio'}
      </h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <AccessoryForm
        mode={isEditMode ? 'edit' : 'create'}
        categories={categories}
        materials={materials}
        initialValues={initialValues}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSubmit}
        onCancel={goToList}
      />
    </div>
  );
}

export default AccessoryFormPage;
