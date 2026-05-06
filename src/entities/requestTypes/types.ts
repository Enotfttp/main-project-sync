export enum ERequestTypeRequestStatus {
  CREATED = "Создан",
  ACCEPTED = "Принят в обработку",
  REJECTED = "Отклонён",
  PROCESSED = "В процессе обработки",
  COMPLETED = "Работа с завершена",
  ERROR = "Ошибка обработки",
}

export enum ERequestTypeResultType {
  OPERATION_SUCCESS = "Успешеная операция",
  OPERATION_DECLINE = "Отменённая платёж",
  CARD_INDEX_PLAN = "Индексирование карточного плана",
  CARD_INDEX_DONE = "Карточный учёт завершен",
  ANNULMENT = "Аннулирование",
  CANCELLATION = "Отмена",
}

export enum ERequestTypesEventType {
  PACKAGE_ACTIVATION = "Подключение ПУ",
  OPTION_ACTIVATION = "Подключение ДО",
  PACKAGE_PROLONGATION = "Пролонгация ПУ",
  OPTION_PROLONGATION = "Пролонгация ДО",
  PACKAGE_CHANGE = "Смена ПУ",
  PACKAGE_MIGRATION = "Миграция бух.учета по авансовой подписке на ПУ из ЦФТ в КОМСОЮЛ",
  OPTION_MIGRATION = "Миграция бух.учета по авансовой подписке на ДО из ЦФТ в КОМСОЮЛ",
  PRE_OPTION_ACTIVATION = "Авансовое подключение ДО (на текущий момент актуально только для подключения ВТБ-Кассы)",
  PRIORITY_CHANGE = "Смена приоритета у запроса на списание комиссии",
  SCHEDULE_UPDATE = "Изменение платежных данных",
  DISABLE_PACKAGE = "Отключение подписки на ПУ",
  DISABLE_OPTION = "Отключение подписки на ДО",
  CANCEL_FEE = "Аннулирование комиссии",
}

export interface IRequestType {
  id: string; // UUID
  incomingMessageId: number;
  packageSubscriptionId: number;
  requestId: string; // UUID
  scheduleSourceGuid: string; // UUID
  status: keyof typeof ERequestTypeRequestStatus;
  resultType: keyof typeof ERequestTypeResultType;
  errorCode: string;
  errorMessage: string;
  requestCreatedAt: string;
  eventType: keyof typeof ERequestTypesEventType;
  attemptsCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any> | null;
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}
