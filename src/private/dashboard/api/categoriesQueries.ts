import { queryOptions, useQuery } from '@tanstack/react-query';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '@private/dashboard/api/categoriesApi';
import { useNameResource } from '@private/dashboard/api/nameResourceQueries';
import { accessoryKeys, categoryKeys } from '@shared/api/queryKeys';

export function categoriesQueryOptions() {
  return queryOptions({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });
}

export function useCategories() {
  return useQuery(categoriesQueryOptions());
}

export function useCategoriesManager() {
  return useNameResource({
    queryOptions: categoriesQueryOptions(),
    dependentKeys: [accessoryKeys.all],
    create: createCategory,
    update: updateCategory,
    remove: deleteCategory,
  });
}
