export const accessoryKeys = {
  all: ['accessories'] as const,
  list: () => [...accessoryKeys.all, 'list'] as const,
  detail: (id: string) => [...accessoryKeys.all, 'detail', id] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
};

export const materialKeys = {
  all: ['materials'] as const,
};
