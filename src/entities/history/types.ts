export type ComcRequestStatus =
  | "CREATED"
  | "ACCEPTED"
  | "REJECTED"
  | "PROCESSED"
  | "COMPLETED"
  | "ERROR";

export const ComcRequestStatusText: Record<ComcRequestStatus, string> = {
  CREATED: "Создан",
  ACCEPTED: "Принят в обработку",
  REJECTED: "Отклонён",
  PROCESSED: "В процессе обработки",
  COMPLETED: "Работа с завершена",
  ERROR: "Ошибка обработки",
};

type TStepperStatus = "completed" | "warning" | "error" | undefined;

interface IParamView {
  priority: number;
  status: TStepperStatus;
}

export const ComcRequestStatusView: Record<ComcRequestStatus, IParamView> = {
  CREATED: { priority: 0, status: "completed" },
  ACCEPTED: { priority: 1, status: "completed" },
  REJECTED: { priority: 2, status: "warning" },
  PROCESSED: { priority: 3, status: "completed" },
  COMPLETED: { priority: 4, status: "completed" },
  ERROR: { priority: 5, status: "error" },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>;
}
