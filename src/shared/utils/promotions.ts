import type { Promotion } from '@shared/types/promotion';

export function getFirstActivePromotion(promotions: Promotion[]) {
  return promotions.find((promotion) => promotion.isActive) ?? null;
}

export function calculateDiscountedPrice(price: number, discount: number) {
  const safeDiscount = Math.min(Math.max(discount, 0), 100);

  return Math.round(price * (1 - safeDiscount / 100));
}
