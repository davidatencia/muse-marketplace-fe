import NameResourceManager from '@private/dashboard/components/NameResourceManager/NameResourceManager';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '@private/dashboard/api/categoriesApi';

function Categories() {
  return (
    <NameResourceManager
      heading="Categorías"
      description="Administra las categorías de los accesorios."
      singularLabel="la categoría"
      loadErrorMessage="No se pudieron cargar las categorías"
      fetchAll={getCategories}
      create={createCategory}
      update={updateCategory}
      remove={deleteCategory}
    />
  );
}

export default Categories;
