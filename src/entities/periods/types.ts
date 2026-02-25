export enum EPeriodsStatus {
  CREATED = "Активен",
  COMPLETED = "Обработан",
  CANCEL = "Отменён",
}

export enum EPeriodsResultType {
  ITERIM_ACCOUNT = "Переведён на промежуточный счёт",
  BANK_INCOME_ACCOUNT = "Переведён на счёт доходов",
  ANNULMENT = "Аннулирован",
}

export interface IPeriods {
  id: number;
  resultType: keyof typeof EPeriodsResultType;
  startDate: string;
  endDate: string;
  status: keyof typeof EPeriodsStatus;
  amount: number;
  additionalAmount: number;
  createdAt: string;
  updatedAt: string;
}
