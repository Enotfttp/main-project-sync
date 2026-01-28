import { TRequestTypeEventType } from "@entities/requestTypes/types";

export type TPaymentScheduleStatus =
  | "FRM_SUCCESS"
  | "FRM_ERR"
  | "PROV"
  | "DECLINE"
  | "KART"
  | "CANCEL_FEE"
  | "ERROR";

export type TResultType =
  | "PAYMENT_SUCCESS"
  | "PAYMENT_DECLINE"
  | "CARD_INDEX"
  | "ANNULMENT"
  | "CANCELLATION";

export type ComcRequestStatus =
  | "CREATED"
  | "ACCEPTED"
  | "REJECTED"
  | "PROCESSED"
  | "COMPLETED"
  | "ERROR";

export type TPaymentStatus =
  | "ITERIM_ACCOUNT"
  | "BANK_INCOME_ACCOUNT"
  | "ANNULMENT";

export const PaymentStatusText: Record<TPaymentStatus, string> = {
  ITERIM_ACCOUNT: "Сумма переведена на промежуточный счет",
  BANK_INCOME_ACCOUNT: "Сумма переведена на счет доходов банка",
  ANNULMENT: "Период аннулирован",
};

export const ComcRequestStatusText: Record<ComcRequestStatus, string> = {
  CREATED: "Создан",
  ACCEPTED: "Принят в обработку",
  REJECTED: "Отклонён",
  PROCESSED: "В процессе обработки",
  COMPLETED: "Работа с завершена",
  ERROR: "Ошибка обработки",
};

export type TStepperStatus = "completed" | "warning" | "error" | undefined;

interface IParamView {
  priority: number;
  status: TStepperStatus;
}

export const ComcRequestStatusView: Record<ComcRequestStatus, IParamView> = {
  CREATED: { priority: 0, status: "completed" },
  ACCEPTED: { priority: 1, status: "completed" },
  REJECTED: { priority: 2, status: "warning" },
  PROCESSED: { priority: 3, status: "completed" },
  ERROR: { priority: 4, status: "error" },
  COMPLETED: { priority: 5, status: "completed" },
};

export type ComcResultType =
  | "PAYMENT_SUCCESS"
  | "PAYMENT_DECLINE"
  | "CARD_INDEX"
  | "ANNULMENT"
  | "CANCELLATION";

export const ComcResultTypeText = {
  PAYMENT_SUCCESS: "Успешеный платёж",
  PAYMENT_DECLINE: "Платёж отменён",
  CARD_INDEX: "Индекс карт",
  ANNULMENT: "Аннулирование",
  CANCELLATION: "Отмена",
};

export type RequestHistoryKafkaStatus =
  | "CREATED"
  | "PROCESSED"
  | "DO_NOT_SEND"
  | "ERROR";

export const RequestHistoryKafkaStatusText = {
  CREATED: "Создан",
  PROCESSED: "Отправлено в Kafka",
  DO_NOT_SEND: "Не отребуется отправлять в Kafka",
  ERROR: "Ошибка при отправки",
};

interface IPayments {
  periodId: string;
  startDate: string;
  endDate: string;
  status: TPaymentStatus;
  interimAccountPostDate: string;
  bankIncomeAccountPostDate: string;
}

interface IResult {
  resultType: TResultType;
  payments: IPayments[];
}

export interface IContent {
  message: { uuid: string; timeStamp: string };
  requestId: string;
  paymentScheduleId: string;
  eventDateTime: string;
  eventType: TRequestTypeEventType;
  requestStatus: ComcRequestStatus;
  paymentScheduleStatus: TPaymentScheduleStatus;
  result: IResult;
  error: { errorCode: string; errorMessage: string };
}

export interface IRequestHistory {
  id: number;
  comcRequestId?: number | null;
  requestId: string; // UUID
  packageSubscriptionId: number;
  status: ComcRequestStatus;
  resultType?: ComcResultType | null;
  statusCode?: string | null;
  statusDescription?: string | null;
  kafkaSendStatus: RequestHistoryKafkaStatus;
  createdAt: string;
  updatedAt: string;
  content: IContent;
}
