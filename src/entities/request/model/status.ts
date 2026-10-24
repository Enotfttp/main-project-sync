export const EventType = {
  PACKAGE_ACTIVATION: "Подключение ПУ",
  OPTION_ACTIVATION: "Подключение ДО",
  PACKAGE_PROLONGATION: "Пролонгация ПУ",
  OPTION_PROLONGATION: "Пролонгация ДО",
  PACKAGE_CHANGE: "Смена ПУ",
  PACKAGE_MIGRATION: "Миграция ПУ",
  OPTION_MIGRATION: "Миграция ДО",
  PRE_OPTION_ACTIVATION: "ВТБ-Касса",
  PRIORITY_CHANGE: "Смена приоритета",
  SHEDULE_UPDATE: "Обновление данных",
  DISABLE_PACKAGE: "Отключение ПУ",
  DISABLE_OPTION: "Отключение ДО",
  CANCEL_FEE: "Отмена графика",
} as const;

export type TEventType = keyof typeof EventType;

export const mapEventType = (status: TEventType) => EventType[status];

export const RequestStatus = {
  CREATED: "Создан",
  ACCEPTED: "Принят",
  REJECTED: "Отклонен",
  PROCESSED: "В обработке",
  COMPLETED: "Обработан",
  ERROR: "В ошибке",
} as const;

export type TRequestStatus = keyof typeof RequestStatus;

export const mapRequestStatus = (status: TRequestStatus) =>
  RequestStatus[status];

export const ResultType = {
  OPERATION_SUCCESS: "Запрос исполнен",
  OPERATION_DECLINE: "Запрос отклонен",
  CARD_INDEX_PLAN: "Выполнен учёт требований",
  CARD_INDEX_DONE: "Поставлен в картотеку",
  ANNULMENT: "Запрос аннулирован",
  CANCELLATION: "Запрос отменен",
} as const;

export type TResultType = keyof typeof ResultType;

export const mapResultType = (status: TResultType) => ResultType[status];

export const PutToOutboxStatus = {
  NEW: "Новый",
  IN_PROGRESS: "В обработке",
  DONE: "Отправлен",
  ERROR: "Ошибка отправки",
  NOT_SUPPORTED: "Не подлежит отправке",
} as const;

export type TPutToOutboxStatus = keyof typeof PutToOutboxStatus;
