export const OptionStatus = {
  CREATED: "Создана",
  ACTIVE: "В процессе оплаты",
  INACTIVE: "Оплата завершена",
  DISABLED: "Отключена",
} as const;

export type TOptionStatus = keyof typeof OptionStatus;

export const mapOptionStatus = (status: TOptionStatus) => OptionStatus[status];
