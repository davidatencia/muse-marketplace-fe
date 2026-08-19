import NameResourceManager from '@private/dashboard/components/NameResourceManager/NameResourceManager';
import {
  createMaterial,
  deleteMaterial,
  getMaterials,
  updateMaterial,
} from '@private/dashboard/api/materialsApi';

function Materials() {
  return (
    <NameResourceManager
      heading="Materiales"
      description="Administra los materiales disponibles para los accesorios."
      singularLabel="el material"
      loadErrorMessage="No se pudieron cargar los materiales"
      fetchAll={getMaterials}
      create={createMaterial}
      update={updateMaterial}
      remove={deleteMaterial}
    />
  );
}

export default Materials;
