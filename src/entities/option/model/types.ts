import { TOptionStatus } from "./status";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
} from "@shared/types";

export interface IOptionFilter {
  packageSubscriptionId?: number;
  packageName?: string;
  packageStatus?: TOptionStatus;
  activationDateFrom?: IsoDate;
  activationDateTo?: IsoDate;
  deactivationDateFrom?: IsoDate;
  deactivationDateTo?: IsoDate;
  amountFullCur?: number;
  paymentPeriodFrom?: IsoDate;
  paymentPeriodTo?: IsoDate;
}

export interface IOptionInfo {
  packageSubscriptionId: number;
  packageName: string;
  packageStatus: TOptionStatus;
  activationDate: IsoDate;
  deactivationDate: IsoDate;
  amountFullCur: number;
  paymentPeriodFrom: IsoDate;
  paymentPeriodTo: IsoDate;
}

export type TOptionsPaginationResponse =
  ITableDataPaginationResponse<IOptionInfo>;

export type TOptionsRequest = TFilterPaginationRequest<
  IOptionFilter,
  IOptionInfo
>;

export interface IOptionInfoDetails {
  packageSubscriptionId: number;
  packageName: string;
  packageStatus: TOptionStatus;
  activationDate: IsoDate;
  deactivationDate: IsoDate;
  amountFullCur: number;
  paymentPeriodFrom: IsoDate;
  paymentPeriodTo: IsoDate;
  accountNumber: string;
  accountCode: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
