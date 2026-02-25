/**
 * CREATED - запись создана
 * ACCEPTED  - запрос принят в обработку
 * REJECTED - запрос отклонен, ошибка валидации
 * PROCESSED - запрос в процессе обработки
 * COMPLETED -  работа с запросом завершена
 * ERROR - ошибка обработки
 */
export enum ERequestTypeRequestStatus {
  CREATED = "Создан",
  ACCEPTED = "Принят в обработку",
  REJECTED = "Отклонён",
  PROCESSED = "В процессе обработки",
  COMPLETED = "Работа с завершена",
  ERROR = "Ошибка обработки",
}

/**
 * PAYMENT_SUCCESS - успешеный платёж
 * PAYMENT_DECLINE  - платёж отменён
 * CARD_INDEX - индекс карт
 * ANNULMENT - аннулирование
 * CANCELLATION -  отмена
 */
export enum ERequestTypeResultType {
  PAYMENT_SUCCESS = "Успешеный платёж",
  PAYMENT_DECLINE = "Платёж отменён",
  CARD_INDEX = "Индекс карт",
  ANNULMENT = "Аннулирование",
  CANCELLATION = "Отмена",
}

/**
 * PACKAGE_ACTIVATION - Подключение ПУ
 * OPTION_ACTIVATION  - Подключение ДО
 * PACKAGE_PROLONGATION - Пролонгация ПУ
 * OPTION_PROLONGATION - Пролонгация ДО
 * PACKAGE_CHANGE -  Смена ПУ
 * PACKAGE_MIGRATION - Миграция бух.учета по авансовой подписке на ПУ из ЦФТ в КОМСОЮЛ
 * OPTION_MIGRATION - Миграция бух.учета по авансовой подписке на ДО из ЦФТ в КОМСОЮЛ
 * PRE_OPTION_ACTIVATION - Авансовое подключение ДО (на текущий момент актуально только для подключения ВТБ-Кассы)
 * PRIORITY_CHANGE - Смена приоритета у запроса на списание комиссии
 * SCHEDULE_UPDATE - Изменение платежных данныхDISABLE_PACKAGE - отключение подписки на ПУ
 * DISABLE_PACKAGE - Отключение подписки на ПУ
 * DISABLE_OPTION - Отключение подписки на ДО
 * CANCEL_FEE - Аннулирование комиссии
 */
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
  id: number;
  incomingMessageId: number;
  packageSubscriptionId: number;
  requestId: number;
  status: keyof typeof ERequestTypeRequestStatus;
  resultType: keyof typeof ERequestTypeResultType;
  errorCode: string;
  errorMessage: string;
  requestCreatedAt: string;
  eventType: keyof typeof ERequestTypesEventType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}
