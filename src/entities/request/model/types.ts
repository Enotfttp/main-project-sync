export interface IRequestFilter {
  requestId?: UUID;
  dateFrom?: IsoDate;
  dateTo?: IsoDate;
  requestStatus?: TRequestStatus;
  eventType?: TEventType;
  accountCode?: string;
  inn?: string;
}

export interface IRequests {
  requestsInfo: IRequestInfo[];
}

export interface IRequestDetails {
  requestInfo: IRequestInfoDetails;
  errorInfo?: IErrorInfo;
}
export interface IRequestHistory {
  requestHistory: IRequestHistoryInfo;
  errorInfo?: IErrorInfo;
}

interface IRequestInfo {
  requestId: UUID;
  date: IsoDate;
  eventType: TEventType;
  requestStatus: TRequestStatus;
  resultType?: TResultType;
}

interface IRequestInfoDetails {
  requestId: UUID;
  scheduleSourceGuid: UUID;
  packageSubscriptionId: number;
  requestDate: IsoDate;
  requestCreated: IsoDate;
  eventType: TEventType;
  requestStatus: TRequestStatus;
  resultType?: TResultType;
  accountCode: string;
  content: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

interface IErrorInfo {
  errorCode: string;
  errorMessage: string;
}

interface IRequestHistoryInfo {
  requestId: UUID;
  eventType: TEventType;
  requestStatus: TRequestStatus;
  resultType?: TResultType;
  putToOutboxStatus: TPutToOutboxStatus;
  content: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

const EventType = {
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

type TEventType = (typeof EventType)[keyof typeof EventType];

const RequestStatus = {
  CREATED: "Создан",
  ACCEPTED: "Принят",
  REJECTED: "Отклонен",
  PROCESSED: "В обработке",
  COMPLETED: "Обработан",
  ERROR: "В ошибке",
} as const;

type TRequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

const ResultType = {
  OPERATION_SUCCESS: "Запрос исполнен",
  OPERATION_DECLINE: "Запрос отклонен",
  CARD_INDEX_PLAN: "Выполнен учёт требований",
  CARD_INDEX_DONE: "Поставлен в картотеку",
  ANNULMENT: "Запрос аннулирован",
  CANCELLATION: "Запрос отменен",
} as const;

type TResultType = (typeof ResultType)[keyof typeof ResultType];

const PutToOutboxStatus = {
  NEW: "Новый",
  IN_PROGRESS: "В обработке",
  DONE: "Отправлен",
  ERROR: "Ошибка отправки",
  NOT_SUPPORTED: "Не подлежит отправке",
} as const;

type TPutToOutboxStatus =
  (typeof PutToOutboxStatus)[keyof typeof PutToOutboxStatus];
