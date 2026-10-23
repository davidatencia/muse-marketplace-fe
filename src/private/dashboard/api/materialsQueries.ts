import { queryOptions, useQuery } from '@tanstack/react-query';
import {
  createMaterial,
  deleteMaterial,
  getMaterials,
  updateMaterial,
} from '@private/dashboard/api/materialsApi';
import { useNameResource } from '@private/dashboard/api/nameResourceQueries';
import { accessoryKeys, materialKeys } from '@shared/api/queryKeys';

export function materialsQueryOptions() {
  return queryOptions({
    queryKey: materialKeys.all,
    queryFn: getMaterials,
    staleTime: 5 * 60_000,
  });
}

export function useMaterials() {
  return useQuery(materialsQueryOptions());
}

export function useMaterialsManager() {
  return useNameResource({
    queryOptions: materialsQueryOptions(),
    dependentKeys: [accessoryKeys.all],
    create: createMaterial,
    update: updateMaterial,
    remove: deleteMaterial,
  });
}
