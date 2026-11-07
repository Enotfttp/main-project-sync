import { TPackageStatus } from "./status";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
} from "@shared/types";

export interface IPackageFilter {
  packageSubscriptionId?: number;
  packageName?: string;
  packageStatus?: TPackageStatus;
  activationDateFrom?: IsoDate;
  activationDateTo?: IsoDate;
  deactivationDateFrom?: IsoDate;
  deactivationDateTo?: IsoDate;
  amountFullCur?: number;
  paymentPeriodFrom?: IsoDate;
  paymentPeriodTo?: IsoDate;
}

export interface IPackageInfo {
  packageSubscriptionId: number;
  packageName: string;
  packageStatus: TPackageStatus;
  activationDate: IsoDate;
  deactivationDate: IsoDate;
  amountFullCur: number;
  paymentPeriodFrom: IsoDate;
  paymentPeriodTo: IsoDate;
}

export type TPackagesPaginationResponse =
  ITableDataPaginationResponse<IPackageInfo>;

export type TPackagesRequest = TFilterPaginationRequest<
  IPackageFilter,
  IPackageInfo
>;

export interface IPackageInfoDetails {
  packageSubscriptionId: number;
  packageName: string;
  packageStatus: TPackageStatus;
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
