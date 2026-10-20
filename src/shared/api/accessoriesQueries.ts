import { queryOptions, useQuery } from '@tanstack/react-query';
import { getAccessories, getAccessory } from '@shared/api/accessoriesApi';
import { accessoryKeys } from '@shared/api/queryKeys';

export function accessoriesQueryOptions() {
  return queryOptions({
    queryKey: accessoryKeys.list(),
    queryFn: getAccessories,
  });
}

export function accessoryQueryOptions(id: string) {
  return queryOptions({
    queryKey: accessoryKeys.detail(id),
    queryFn: () => getAccessory(id),
    staleTime: 30_000,
  });
}

export function useAccessories() {
  return useQuery(accessoriesQueryOptions());
}

export function useAccessory(id: string | undefined) {
  return useQuery({
    ...accessoryQueryOptions(id ?? ''),
    enabled: Boolean(id),
  });
}
