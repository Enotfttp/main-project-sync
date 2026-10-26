import { TPackageStatus } from "./status";
import { ITableDataPaginationResponse } from "@shared/types";

export interface IPackageInfo {
  packageSubscriptionId: string;
  packageName: string;
  packageStatus: TPackageStatus;
  activationDateFrom: IsoDate;
  activationDateTo: IsoDate;
  deactivationDateFrom: IsoDate;
  deactivationDateTo: IsoDate;
  amountFullCur: number;
  paymentPeriodFrom: IsoDate;
  paymentPeriodTo: IsoDate;
}

export type TPackagePaginationResponse =
  ITableDataPaginationResponse<IPackageInfo>;
