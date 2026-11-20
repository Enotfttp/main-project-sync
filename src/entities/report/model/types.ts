import {
  TDocumentProcessCode,
  TDocumentStatus,
  TDocumentType,
  TOrderStatus,
} from "./status";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
} from "@shared/types";

export interface IReportInfo {
  documentId: UUID;
  requestId: UUID;
  scheduleSourceGuid: UUID;
  documentDate: IsoDate;
  documentType: TDocumentType;
  documentProcessCode: TDocumentProcessCode;
  documentStatus: TDocumentStatus;
  orderStatus: TOrderStatus;
  amountFullCur: number;
  documentMerged: boolean;
  purpose: string;
}

export type TReportsPaginationResponse =
  ITableDataPaginationResponse<IReportInfo>;

export type TReportsRequest = TFilterPaginationRequest<object, IReportInfo>;
