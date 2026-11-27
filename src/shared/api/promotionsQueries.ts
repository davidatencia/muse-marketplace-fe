import { queryOptions, useQuery } from '@tanstack/react-query';
import { getPromotions } from '@shared/api/promotionsApi';
import { promotionKeys } from '@shared/api/queryKeys';

export function promotionsQueryOptions() {
  return queryOptions({
    queryKey: promotionKeys.list(),
    queryFn: getPromotions,
  });
}

export function usePromotions(enabled = true) {
  return useQuery({
    ...promotionsQueryOptions(),
    enabled,
  });
}
