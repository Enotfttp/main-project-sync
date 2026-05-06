import { ERequestTypesEventType } from "@entities/requestTypes/types";

export enum EPaymentStatus {
  ITERIM_ACCOUNT = "Сумма переведена на промежуточный счет",
  BANK_INCOME_ACCOUNT = "Сумма переведена на счет доходов банка",
  ANNULMENT = "Период аннулирован",
}

export enum EComcRequestStatus {
  CREATED = "Создан",
  ACCEPTED = "Принят в обработку",
  REJECTED = "Отклонён",
  PROCESSED = "В процессе обработки",
  COMPLETED = "Работа с завершена",
  ERROR = "Ошибка обработки",
}

export type TStepperStatus = "completed" | "warning" | "error" | undefined;

interface IParamView {
  priority: number;
  status: TStepperStatus;
}

export const ComcRequestStatusView: Record<
  keyof typeof EComcRequestStatus,
  IParamView
> = {
  CREATED: { priority: 0, status: "completed" },
  ACCEPTED: { priority: 1, status: "completed" },
  REJECTED: { priority: 2, status: "warning" },
  PROCESSED: { priority: 3, status: "completed" },
  ERROR: { priority: 4, status: "error" },
  COMPLETED: { priority: 5, status: "completed" },
};

export enum EComcResultType {
  OPERATION_SUCCESS = "Успешеная операция",
  OPERATION_DECLINE = "Отменённая платёж",
  CARD_INDEX_PLAN = "Индексирование карточного плана",
  CARD_INDEX_DONE = "Карточный учёт завершен",
  ANNULMENT = "Аннулирование",
  CANCELLATION = "Отмена",
}

export type TPaymentScheduleStatus =
  | "FRM_SUCCESS"
  | "FRM_ERR"
  | "PROV"
  | "DECLINE"
  | "KART"
  | "CANCEL_FEE"
  | "ERROR";

interface IPayments {
  periodId: string;
  startDate: string;
  endDate: string;
  status: keyof typeof EPaymentStatus;
  interimAccountPostDate: string;
  bankIncomeAccountPostDate: string;
}

interface IResult {
  resultType: keyof typeof EComcResultType;
  payments: IPayments[];
}

export interface IContent {
  message: { uuid: string; timeStamp: string };
  requestId: string;
  paymentScheduleId: string;
  eventDateTime: string;
  eventType: keyof typeof ERequestTypesEventType;
  requestStatus: keyof typeof EComcRequestStatus;
  paymentScheduleStatus: TPaymentScheduleStatus;
  result: IResult;
  error: { errorCode: string; errorMessage: string };
}

export interface IRequestHistory {
  id: number;
  comcRequestId?: number | null;
  requestId: string; // UUID
  packageSubscriptionId: number;
  scheduleSourceGuid: string; // UUID
  status: keyof typeof EComcRequestStatus;
  resultType?: keyof typeof EComcResultType | null;
  errorCode?: string | null;
  errorMessage?: string | null;
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
  content: IContent;
}
