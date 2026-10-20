import { httpClient } from '@shared/api/httpClient';
import type { Accessory } from '@shared/types/accessory';

// The API returns MySQL-style values: tinyint booleans and DECIMAL as strings.
type AccessoryRow = Omit<
  Accessory,
  'handmade' | 'highlighted' | 'price' | 'rating'
> & {
  handmade: boolean | 0 | 1;
  highlighted: boolean | 0 | 1;
  price: number | string;
  rating: number | string | null;
};

function normalizeAccessory(row: AccessoryRow): Accessory {
  return {
    ...row,
    handmade: Boolean(row.handmade),
    highlighted: Boolean(row.highlighted),
    price: Number(row.price),
    rating: row.rating === null ? null : Number(row.rating),
  };
}

export function getAccessories() {
  return httpClient
    .get<AccessoryRow[]>('/accessories')
    .then((response) => response.data.map(normalizeAccessory));
}

export function getAccessory(id: string) {
  return httpClient
    .get<AccessoryRow[]>(`/accessories/${id}`)
    .then((response) => normalizeAccessory(response.data[0]));
}
