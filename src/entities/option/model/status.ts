export const OptionStatus = {
  CREATED: "Создан",
  ACCEPTED: "Принят",
  REJECTED: "Отклонен",
  PROCESSED: "В обработке",
  COMPLETED: "Обработан",
  ERROR: "В ошибке",
} as const;

export type TOptionStatus = keyof typeof OptionStatus;

export const mapOptionStatus = (status: TOptionStatus) => OptionStatus[status];
