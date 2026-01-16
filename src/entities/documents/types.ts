export type TOrderStatus =
  | "PASSED_VERIFICATION"
  | "UNDER_VERIFICATION"
  | "DOCUMENT_ERROR";

export const OrderStatusText = {
  PASSED_VERIFICATION: "Прошёл проверку",
  UNDER_VERIFICATION: "Находится на этапе проверки",
  DOCUMENT_ERROR: "Ошибка документа",
};

/**
 * PAYMENT_REQUEST_DOC - Платежное требование
 * MEMORIAL_ORDER_DOC - Мемориальный ордер
 * BANK_ORDER_DOC - Банковский ордер
 * NULL_PAYMENT_DOC - Нулевой контракт
 */
export type TDocType =
  | "PAYMENT_REQUEST_DOC"
  | "MEMORIAL_ORDER_DOC"
  | "BANK_ORDER_DOC"
  | "NULL_PAYMENT_DOC";

export const DocTypeText = {
  PAYMENT_REQUEST_DOC: "Платежное требование",
  MEMORIAL_ORDER_DOC: "Мемориальный ордер",
  BANK_ORDER_DOC: "Банковский ордер",
  NULL_PAYMENT_DOC: "Нулевой контракт",
};

/**
 * CREATED - документ создан
 * SENT - документ отправили
 * DELIVERED - документ принят
 * PROCESSED - получен ответ от РОЮЛ, требуется повторная обработка
 * COMPLETED - получен ответ от РОЮЛ, обработка документа завершена
 * ERROR - ошибка обработки документа
 */
export type TDocStatus =
  | "CREATED"
  | "SENT"
  | "DELIVERED"
  | "PROCESSED"
  | "COMPLETED"
  | "ERROR";

export const DocStatusText = {
  CREATED: "Документ создан",
  SENT: "Документ отправили",
  DELIVERED: "Документ принят",
  PROCESSED: "Tребуется повторная обработка",
  COMPLETED: "Обработка документа завершена",
  ERROR: "Ошибка обработки документа",
};

export interface IDocuments {
  id: number;
  incomingMessageId: number;
  requestId: number;
  processDate: string;
  executionDate: string;
  docType: TDocType;
  status: TDocStatus;
  orderStatus: TOrderStatus | null;
  availableAt: string;
  createdAt: string;
  updatedAt: string;
}
