import { httpClient } from '@shared/api/httpClient';
import type { Accessory } from '@shared/types/accessory';

type AccessoryRow = Omit<Accessory, 'handmade' | 'highlighted'> & {
  handmade: boolean | 0 | 1;
  highlighted: boolean | 0 | 1;
};

function normalizeAccessory(row: AccessoryRow): Accessory {
  return {
    ...row,
    handmade: Boolean(row.handmade),
    highlighted: Boolean(row.highlighted),
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
