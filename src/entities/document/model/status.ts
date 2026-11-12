export const DocumentStatus = {
  CREATED: "Создан",
  SENT: "Отправлен в МС Комиссии",
  DELIVERED: "Доставлен в МС Комиссии",
  VALIDATION_ERROR: "Ошибка валидации",
  ACCEPTED: "Принят оркестратором",
  REJECTED: "Отклонен оркестратором",
  COMPLETED: "Обработан",
  OUTDATED: "Переформирован",
  ERROR: "Ошибка доставки",
  ANNULLED: "Аннулирован",
} as const;

export type TDocumentStatus = keyof typeof DocumentStatus;

export const mapDocumentStatus = (status: TDocumentStatus) =>
  DocumentStatus[status];

export const DocumentType = {
  PT_COM: "PT_COM",
  PT_COMNDS: "PT_COMNDS",
  UNIVERSALDOC: "UNIVERSALDOC",
  CREDITDOC: "CREDITDOC",
  NULL_PAYMENT_DOC: "NULL_PAYMENT_DOC",
  NULL_OPERATION_DOC: "NULL_OPERATION_DOC",
} as const;

export type TDocumentType = keyof typeof DocumentType;

export const DocumentProcessCode = {
  PKG_PAY_ADVANCE: "PKG_PAY_ADVANCE",
  PKG_INCOME: "PKG_INCOME",
  PKG_SETTLEMENT: "PKG_SETTLEMENT",
  PKG_REFUND_ADVANCE: "PKG_REFUND_ADVANCE",
  PKG_PAY_CHANGE: "PKG_PAY_CHANGE",
  PKG_INCOME_NDS: "PKG_INCOME_NDS",
  ACCRUE: "ACCRUE",
  PKG_SETTLE: "PKG_SETTLE",
} as const;

export type TDocumentProcessCode = keyof typeof DocumentProcessCode;

export const OrderStatus = {
  CREATED: "Запрос разобран",
  FORMED: "ПТ сформировано",
  FRM_ERR: "Ошибка валидации",
  SENT: "Отправлен в оркестратор",
  ACCEPTED: "Принят оркестратором",
  REJECTED: "Отклонен оркестратором",
  KART: "Поставлен в картотеку",
  PROV: "Исполнен",
  QUEUE: "В очереди",
  REVOKED: "Отозван",
  DELETED: "Аннулирован",
} as const;

export type TOrderStatus = keyof typeof OrderStatus;

export const mapOrderStatus = (status: TOrderStatus) => OrderStatus[status];
