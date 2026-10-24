import {
  TEventType,
  TProcessCode,
  TPutToOutboxStatus,
  TRequestStatus,
  TResultType,
  TScheduleStatus,
} from "./status";
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
