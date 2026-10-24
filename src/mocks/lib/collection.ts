export interface ICollection<T, K extends keyof T> {
  all(): T[];
  find(id: unknown): T | undefined;
  where(predicate: (item: T) => boolean): T[];
  create(item?: Partial<T>): T;
  update(id: unknown, patch: Partial<T>): T | undefined;
  remove(id: unknown): boolean;
  reset(): void;
  idKey: K;
}

/**
 * In-memory хранилище сущности. Данные живут до перезагрузки страницы,
 * поэтому PATCH/DELETE влияют на последующие GET.
 */
export const createCollection = <T extends object, K extends keyof T>(
  idKey: K,
  factory: (index: number) => T,
  count: number,
): ICollection<T, K> => {
  const seed = () =>
    Array.from({ length: count }, (_, index) => factory(index));
  let items = seed();

  const isSame = (item: T, id: unknown) => String(item[idKey]) === String(id);

  return {
    idKey,
    all: () => items,
    find: (id) => items.find((item) => isSame(item, id)),
    where: (predicate) => items.filter(predicate),
    create: (item) => {
      const created = { ...factory(items.length), ...item };
      items = [created, ...items];
      return created;
    },
    update: (id, patch) => {
      const index = items.findIndex((item) => isSame(item, id));
      if (index === -1) return undefined;
      items[index] = { ...items[index], ...patch };
      return items[index];
    },
    remove: (id) => {
      const length = items.length;
      items = items.filter((item) => !isSame(item, id));
      return items.length !== length;
    },
    reset: () => {
      items = seed();
    },
  };
};
