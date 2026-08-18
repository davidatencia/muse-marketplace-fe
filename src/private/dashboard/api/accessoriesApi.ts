import { httpClient } from '@shared/api/httpClient';
import type { Accessory, AccessoryPayload } from '@private/dashboard/types/accessory';

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

export function createAccessory(payload: AccessoryPayload) {
  return httpClient.post('/accessories', [payload]);
}

export function updateAccessory(id: string, payload: Partial<AccessoryPayload>) {
  return httpClient.patch(`/accessories/${id}`, payload);
}

export function deleteAccessory(id: string) {
  return httpClient.delete(`/accessories/${id}`);
}
