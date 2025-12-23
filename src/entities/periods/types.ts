export type PeriodsStatus = "CREATED" | "COMPLETED" | "CANCEL";

export const PeriodsStatusText = {
  CREATED: "Активен",
  COMPLETED: "Обработан",
  CANCEL: "Отменён",
};

export type PeriodsResultType =
  | "ITERIM_ACCOUNT"
  | "BANK_INCOME_ACCOUNT"
  | "ANNULMENT";

export const PeriodsResultTypeText = {
  ITERIM_ACCOUNT: "Переведён на промежуточный счёт",
  BANK_INCOME_ACCOUNT: "Переведён на счёт доходов",
  ANNULMENT: "Аннулирован",
};

export interface IPeriods {
  id: number;
  resultType: PeriodsResultType;
  startDate: string;
  endDate: string;
  status: PeriodsStatus;
  amount: number;
  additionalAmount: number;
  createdAt: string;
  updatedAt: string;
}
