import { httpClient } from '@shared/api/httpClient';
import type { Material, MaterialPayload } from '@private/dashboard/types/material';

export function getMaterials() {
  return httpClient
    .get<Material[]>('/accessory-materials')
    .then((response) => response.data);
}

export function createMaterial(payload: MaterialPayload) {
  return httpClient.post('/accessory-materials', payload);
}

export function updateMaterial(id: number, payload: MaterialPayload) {
  return httpClient.put(`/accessory-materials/${id}`, payload);
}

export function deleteMaterial(id: number) {
  return httpClient.delete(`/accessory-materials/${id}`);
}
