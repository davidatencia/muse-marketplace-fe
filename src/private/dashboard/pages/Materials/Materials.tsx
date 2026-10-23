import { LayersIcon } from '@private/dashboard/components/ui/icons';
import NameResourceManager from '@private/dashboard/components/NameResourceManager/NameResourceManager';
import { useMaterialsManager } from '@private/dashboard/api/materialsQueries';

function Materials() {
  const resource = useMaterialsManager();

  return (
    <NameResourceManager
      heading="Materiales"
      description="Administra los materiales disponibles para los accesorios."
      singularLabel="el material"
      loadErrorMessage="No se pudieron cargar los materiales"
      resource={resource}
      icon={<LayersIcon size={22} />}
    />
  );
}

export default Materials;
