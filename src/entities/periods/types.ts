export enum EPeriodsStatus {
  CREATED = "Активен",
  PAYMENT_PROCESSED = "Отнесено на промежуточный счет",
  INCOME_NDS_PROCESSED = "НДС отнесено на доходы",
  INCOME_PROCESSED = "Отнесено на доходы",
  DEBT_ACCOUNTED = "Учет требований",
  ACCOUNTS_SETTLED = "Урегулирование счетов",
  ADDITIONAL_DEBT_ACCOUNTED = "Доучет требований",
  PAYMENT_REFUNDED = "Выполнен возврат",
  ANNULLED = "Аннулирован",
  CARD_INDEXED = "В картотеке",
  DECLINED = "Оплата не выполнена",
  REVOKED = "Отозван",
  COMPLETED = "Обработан",
  CANCEL = "Отменен",
  ERROR = "Ошибка обработки",
}

export enum EPeriodsResultType {
  ITERIM_ACCOUNT = "Переведён на промежуточный счёт",
  BANK_INCOME_ACCOUNT = "Переведён на счёт доходов",
  ANNULMENT = "Аннулирован",
}

export interface IPeriods {
  id: number;
  periodId: string; // UUID
  resultType: keyof typeof EPeriodsResultType;
  startDate: string; // DATE;
  endDate: string; // DATE;
  status: keyof typeof EPeriodsStatus;
  amount: number;
  additionalAmount: number;
  periodNumber: number;
  inGroupOperation: boolean;
  updatedAt: string; // TIMESTAMPTZ
}
