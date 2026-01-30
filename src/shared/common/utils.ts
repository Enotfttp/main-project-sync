export function uid(): string {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    "",
  );
}

export function additionalHover<T>(arr?: T[]): T[] | [] {
  return arr?.length ? arr.map((item) => ({ ...item, hover: true })) : [];
}

export function addIdTableRowData<T, K extends keyof T>(
  field: K,
  arr?: T[],
): Array<T & { id: T[K] }> | [] {
  return arr?.length ? arr.map((item) => ({ ...item, id: item[field] })) : [];
}

/**
 * Метод для нормализации данных из UTC формата
 *
 * @param date Дата в UTC
 * @param withTime флаг от которого зависит какую дату возвращать с временем или нет
 */
export function normalizedDate(date: string, withTime?: boolean) {
  const newDate = new Date(date);
  const normalizedDate = newDate.toLocaleDateString();

  if (withTime) {
    const time = newDate.toLocaleTimeString().slice(0, -3);

    return `${normalizedDate} ${time}`;
  }

  return normalizedDate;
}
