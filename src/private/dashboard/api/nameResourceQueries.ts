import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export interface NameResource {
  id: number;
  name: string;
}

interface NamePayload {
  name: string;
}

interface NameResourceConfig<TKey extends readonly unknown[]> {
  queryOptions: UseQueryOptions<NameResource[], Error, NameResource[], TKey> & {
    queryKey: TKey;
  };
  dependentKeys?: QueryKey[];
  create: (payload: NamePayload) => Promise<unknown>;
  update: (id: number, payload: NamePayload) => Promise<unknown>;
  remove: (id: number) => Promise<unknown>;
}

export function useNameResource<TKey extends readonly unknown[]>({
  queryOptions,
  dependentKeys = [],
  create,
  update,
  remove,
}: NameResourceConfig<TKey>) {
  const queryClient = useQueryClient();

  const { queryKey } = queryOptions;
  const query = useQuery(queryOptions);

  async function applyOptimistic(
    change: (items: NameResource[]) => NameResource[],
  ) {
    await queryClient.cancelQueries({ queryKey });
    const previous = queryClient.getQueryData<NameResource[]>(queryKey);
    queryClient.setQueryData<NameResource[]>(queryKey, (current) =>
      current ? change(current) : current,
    );
    return { previous };
  }

  function rollback(context: { previous?: NameResource[] } | undefined) {
    if (context?.previous) {
      queryClient.setQueryData<NameResource[]>(queryKey, context.previous);
    }
  }

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const invalidateWithDependents = () =>
    Promise.all([
      invalidate(),
      ...dependentKeys.map((key) =>
        queryClient.invalidateQueries({ queryKey: key }),
      ),
    ]);

  const createMutation = useMutation({
    mutationFn: create,
    onSettled: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: NameResource) => update(id, { name }),
    onMutate: ({ id, name }) =>
      applyOptimistic((items) =>
        items.map((item) => (item.id === id ? { ...item, name } : item)),
      ),
    onError: (_error, _variables, context) => rollback(context),
    onSettled: invalidateWithDependents,
  });

  const removeMutation = useMutation({
    mutationFn: remove,
    onMutate: (id: number) =>
      applyOptimistic((items) => items.filter((item) => item.id !== id)),
    onError: (_error, _id, context) => rollback(context),
    onSettled: invalidateWithDependents,
  });

  return { query, createMutation, updateMutation, removeMutation };
}

export type NameResourceQueries = ReturnType<typeof useNameResource>;
