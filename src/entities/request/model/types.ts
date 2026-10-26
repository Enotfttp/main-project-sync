import {
  TEventType,
  TPutToOutboxStatus,
  TRequestStatus,
  TResultType,
} from "./status";
import { ITableDataPaginationResponse } from "@shared/types";

export interface IRequestFilter {
  requestId?: UUID;
  dateFrom?: IsoDate;
  dateTo?: IsoDate;
  requestStatus?: TRequestStatus;
  eventType?: TEventType;
  accountCode?: string;
  inn?: string;
}

export interface IRequestDetails {
  requestInfo: IRequestInfoDetails;
  errorInfo?: IErrorInfo;
}

export interface IRequestHistory {
  requestHistory: IRequestHistoryInfo;
  errorInfo?: IErrorInfo;
}

export interface IRequestContent {
  content: string;
}

export type TRequestsPaginationResponse =
  ITableDataPaginationResponse<IRequestInfo>;

export interface IRequestInfo {
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
