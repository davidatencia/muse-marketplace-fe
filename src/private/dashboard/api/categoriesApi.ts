import { httpClient } from '@shared/api/httpClient';
import type { Category, CategoryPayload } from '@private/dashboard/types/category';

export function getCategories() {
  return httpClient
    .get<Category[]>('/accessory-categories')
    .then((response) => response.data);
}

export function createCategory(payload: CategoryPayload) {
  return httpClient.post('/accessory-categories', payload);
}

export function updateCategory(id: number, payload: CategoryPayload) {
  return httpClient.put(`/accessory-categories/${id}`, payload);
}

export function deleteCategory(id: number) {
  return httpClient.delete(`/accessory-categories/${id}`);
}
