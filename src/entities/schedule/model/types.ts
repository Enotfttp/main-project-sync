import {
  TEventType,
  TPeriodStatus,
  TProcessCode,
  TResultType,
  TScheduleStatus,
} from "./status";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
} from "@shared/types";

export interface IScheduleFilter {
  scheduleSourceGuid?: UUID;
  dateFrom?: IsoDate;
  dateTo?: IsoDate;
  scheduleStatus?: string;
  startDateFrom?: IsoDate;
  endDateTo?: IsoDate;
  amountFullCur?: number;
}

export type TSchedulesPaginationResponse =
  ITableDataPaginationResponse<IScheduleInfo>;

export type TSchedulesRequest = TFilterPaginationRequest<
  IScheduleFilter,
  IScheduleInfo
>;

export type TPeriodsPaginationResponse =
  ITableDataPaginationResponse<IPeriodInfo>;

export type TPeriodsRequest = TFilterPaginationRequest<object, IPeriodInfo> & {
  scheduleSourceGuid: UUID;
};

export interface IScheduleInfo {
  scheduleSourceGuid: UUID;
  date: IsoDate;
  scheduleStatus: TScheduleStatus;
  startDate: IsoDate;
  endDate: IsoDate;
  amountFullCur?: number;
  priority: number;
  processCode: TProcessCode;
}

export interface IScheduleInfoDetails {
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
  optionInfo?: IOptionInfo;
  paymentInfo: IPaymentInfo;
  createdAt: IsoDate;
  updatedAt: IsoDate;
  requiresPriorityChange?: boolean;
}

interface IPackageInfo {
  packageSubscriptionId: number;
  name: string;
  trfNumber: string;
}
interface IOptionInfo {
  optionSubscriptionId: number;
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

export interface IPeriodInfo {
  periodId: UUID;
  status: TPeriodStatus;
  resultType: TResultType;
  startDate: IsoDate;
  endDate: IsoDate;
  amount: number;
  additionalAmount: number;
}
