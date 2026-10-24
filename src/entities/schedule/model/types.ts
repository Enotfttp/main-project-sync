import { ITableDataPaginationResponse } from "@shared/types";

export interface IScheduleFilter {
  scheduleSourceGuid?: UUID;
  dateFrom?: IsoDate;
  dateTo?: IsoDate;
  scheduleStatus?: string;
  startDateFrom?: IsoDate;
  startDateTo?: IsoDate;
  endDateFrom?: IsoDate;
  endDateTo?: IsoDate;
  amountFullCur?: number;
}

export interface ISchedules {
  schedulesInfo: IScheduleInfo[];
}

export interface IScheduleDetails {
  scheduleInfo: IScheduleInfoDetails;
}

export interface ISchedulePeriods {
  periodsInfo: IPeriodInfo[];
  errorInfo: IErrorInfo;
}

export type TSchedulesPaginationResponse =
  ITableDataPaginationResponse<ISchedules>;

interface IScheduleInfo {
  scheduleSourceGuid: UUID;
  date: IsoDate;
  scheduleStatus: TScheduleStatus;
  startDate: IsoDate;
  endDate: IsoDate;
  amountFullCur?: number;
  priority: number;
  processCode: TProcessCode;
}

interface IScheduleInfoDetails {
  scheduleSourceGuid: UUID;
  scheduleStatus: TScheduleStatus;
  scheduleCreatedAt: IsoDate;
  scheduleCancelledAt?: IsoDate;
  eventType: TEventType;
  tbi?: string;
  priority: number;
  accountCode: string;
  currencyAccount?: string;
  processCode: TProcessCode;
  packageInfo: IPackageInfo;
  paymentInfo: IPaymentInfo;
  createdAt: IsoDate;
  updatedAt: IsoDate;
  requiresPriorityChange: string;
}

interface IPackageInfo {
  packageSubscriptionId: number;
  name: string;
  trfNumber: string;
}

interface IPaymentInfo {
  amountFullNdsCur?: number;
  amountFullCur: number;
  vatRate?: number;
  amountNdsCur?: number;
  startDate?: IsoDate;
  endDate?: IsoDate;
}

interface IPeriodInfo {
  requestId: UUID;
  eventType: TEventType;
  requestStatus: TRequestStatus;
  resultType: TResultType;
  putToOutboxStatus: TPutToOutboxStatus;
  content: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

interface IErrorInfo {
  errorCode: string;
  errorMessage: string;
}

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

type TEventType = (typeof EventType)[keyof typeof EventType];

export const RequestStatus = {
  CREATED: "Создан",
  ACCEPTED: "Принят",
  REJECTED: "Отклонен",
  PROCESSED: "В обработке",
  COMPLETED: "Обработан",
  ERROR: "В ошибке",
} as const;

type TRequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export const ResultType = {
  OPERATION_SUCCESS: "Запрос исполнен",
  OPERATION_DECLINE: "Запрос отклонен",
  CARD_INDEX_PLAN: "Выполнен учёт требований",
  CARD_INDEX_DONE: "Поставлен в картотеку",
  ANNULMENT: "Запрос аннулирован",
  CANCELLATION: "Запрос отменен",
} as const;

type TResultType = (typeof ResultType)[keyof typeof ResultType];

export const PutToOutboxStatus = {
  NEW: "Новый",
  IN_PROGRESS: "В обработке",
  DONE: "Отправлен",
  ERROR: "Ошибка отправки",
  NOT_SUPPORTED: "Не подлежит отправке",
} as const;

type TPutToOutboxStatus =
  (typeof PutToOutboxStatus)[keyof typeof PutToOutboxStatus];

export const ScheduleStatus = {
  CREATED: "Создан",
  PROCESSED: "В обработке",
  COMPLETED: "Обработан",
  CANCEL: "Отменен",
  ERROR: "В ошибке",
} as const;

type TScheduleStatus = (typeof ScheduleStatus)[keyof typeof ScheduleStatus];

export const ProcessCode = {
  TOCART: "с картотекой",
  DECLINE: "без картотеки",
} as const;

type TProcessCode = (typeof ProcessCode)[keyof typeof ProcessCode];
