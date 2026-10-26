export const PackageStatus = {
  CREATED: "Создан",
  ACCEPTED: "Принят",
  REJECTED: "Отклонен",
  PROCESSED: "В обработке",
  COMPLETED: "Обработан",
  ERROR: "В ошибке",
} as const;

export type TPackageStatus = keyof typeof PackageStatus;

export const mapPackageStatus = (status: TPackageStatus) =>
  PackageStatus[status];
