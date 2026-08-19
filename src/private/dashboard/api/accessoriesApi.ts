import { httpClient } from '@shared/api/httpClient';
import type { AccessoryPayload } from '@shared/types/accessory';

export function createAccessory(payload: AccessoryPayload) {
  return httpClient.post('/accessories', [payload]);
}

export function updateAccessory(id: string, payload: Partial<AccessoryPayload>) {
  return httpClient.patch(`/accessories/${id}`, payload);
}

export function deleteAccessory(id: string) {
  return httpClient.delete(`/accessories/${id}`);
}
