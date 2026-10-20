import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createAccessory,
  deleteAccessory,
  updateAccessory,
} from '@private/dashboard/api/accessoriesApi';
import { accessoriesQueryOptions } from '@shared/api/accessoriesQueries';
import { accessoryKeys } from '@shared/api/queryKeys';
import type { AccessoryPayload } from '@shared/types/accessory';

interface UpdateAccessoryVariables {
  id: string;
  payload: Partial<AccessoryPayload>;
}

export function useCreateAccessory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccessory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: accessoryKeys.all }),
  });
}

export function useUpdateAccessory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateAccessoryVariables) =>
      updateAccessory(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: accessoryKeys.all }),
  });
}

export function useDeleteAccessory() {
  const queryClient = useQueryClient();
  const { queryKey } = accessoriesQueryOptions();

  return useMutation({
    mutationFn: deleteAccessory,
    // Remove the row right away and restore the previous list if the API fails.
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (current) =>
        current?.filter((accessory) => accessory.id !== id),
      );
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: accessoryKeys.detail(id) });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: accessoryKeys.list() }),
  });
}
