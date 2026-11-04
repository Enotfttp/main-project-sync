import {
  TEventType,
  TPutToOutboxStatus,
  TRequestStatus,
  TResultType,
} from "./status";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
} from "@shared/types";

export interface IRequestFilter {
  requestId?: UUID;
  dateFrom?: IsoDate;
  dateTo?: IsoDate;
  requestStatus?: TRequestStatus;
  eventType?: TEventType;
  accountCode?: string;
  inn?: string;
}

export interface IRequestContent {
  content: string;
}

export type TRequestsPaginationResponse =
  ITableDataPaginationResponse<IRequestInfo>;

export type TRequestsRequest = TFilterPaginationRequest<
  IRequestFilter,
  IRequestInfo
>;

export type TRequestHistoryPaginationResponse =
  ITableDataPaginationResponse<IRequestHistoryInfo>;

export type TRequestHistoryRequest =
  TFilterPaginationRequest<IRequestHistoryInfo> & { id: UUID };

export interface IRequestInfo {
  requestId: UUID;
  date: IsoDate;
  eventType: TEventType;
  requestStatus: TRequestStatus;
  resultType?: TResultType;
}

export interface IRequestInfoDetails extends Partial<IErrorInfo> {
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

export interface IErrorInfo {
  errorCode: string;
  errorMessage: string;
}

export interface IRequestHistoryInfo extends Partial<IErrorInfo> {
  requestHistoryId: UUID;
  eventType: TEventType;
  requestStatus: TRequestStatus;
  resultType?: TResultType;
  putToOutboxStatus: TPutToOutboxStatus;
  content: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
