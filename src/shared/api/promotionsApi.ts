import { httpClient } from '@shared/api/httpClient';
import type { Promotion } from '@shared/types/promotion';

interface PromotionRow {
  id: number;
  description: string;
  discount: number;
  is_active: boolean;
}

function normalizePromotion(row: PromotionRow): Promotion {
  return {
    id: row.id,
    description: row.description,
    discount: row.discount,
    isActive: row.is_active,
  };
}

export function getPromotions() {
  return httpClient
    .get<PromotionRow[]>('/promotions')
    .then((response) => response.data.map(normalizePromotion));
}
