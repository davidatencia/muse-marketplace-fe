import NameResourceManager from '@private/dashboard/components/NameResourceManager/NameResourceManager';
import { useCategoriesManager } from '@private/dashboard/api/categoriesQueries';

function Categories() {
  const resource = useCategoriesManager();

  return (
    <NameResourceManager
      heading="Categorías"
      description="Administra las categorías de los accesorios."
      singularLabel="la categoría"
      loadErrorMessage="No se pudieron cargar las categorías"
      resource={resource}
    />
  );
}

export default Categories;
