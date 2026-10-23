import type { AccessoryFormValues } from '@private/dashboard/components/AccessoryForm/AccessoryForm';
import type { AccessoryPayload } from '@shared/types/accessory';

export type EditableAccessoryValues = Omit<AccessoryFormValues, 'available'>;
export type AccessoryUpdatePayload = Omit<AccessoryPayload, 'available'>;

export function toAccessoryPayload(
  values: EditableAccessoryValues,
): AccessoryUpdatePayload {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
    img: values.img.trim(),
    category_id: Number(values.categoryId),
    handmade: values.handmade,
    highlighted: values.highlighted,
    price: Number(values.price),
    stock: Number(values.stock),
    rating: values.rating ? Number(values.rating) : null,
    materials: values.materialIds.map(Number),
  };
}

function isSameValue(a: unknown, b: unknown) {
  if (Array.isArray(a) && Array.isArray(b)) {
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return (
      sortedA.length === sortedB.length &&
      sortedA.every((value, index) => value === sortedB[index])
    );
  }
  return a === b;
}

export function getChangedFields(
  next: AccessoryUpdatePayload,
  previous: AccessoryUpdatePayload,
): Partial<AccessoryUpdatePayload> {
  const changes: Partial<AccessoryUpdatePayload> = {};

  for (const key of Object.keys(next) as (keyof AccessoryUpdatePayload)[]) {
    if (!isSameValue(next[key], previous[key])) {
      Object.assign(changes, { [key]: next[key] });
    }
  }

  return changes;
}

export function hasChanges(changes: Partial<AccessoryUpdatePayload>) {
  return Object.keys(changes).length > 0;
}
