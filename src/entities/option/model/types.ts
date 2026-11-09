import { TOptionStatus } from "./status";
import {
  ITableDataPaginationResponse,
  TFilterPaginationRequest,
} from "@shared/types";

export interface IOptionInfo {
  optionSubscriptionId: number;
  optionName: string;
  optionStatus: TOptionStatus;
  activationDate: IsoDate;
  deactivationDate: IsoDate;
  amountFullCur: number;
  paymentPeriodFrom: IsoDate;
  paymentPeriodTo: IsoDate;
}

export type TOptionsPaginationResponse =
  ITableDataPaginationResponse<IOptionInfo>;

export type TOptionsRequest = TFilterPaginationRequest<object, IOptionInfo> & {
  packageSubscriptionId: UUID;
};

export interface IOptionInfoDetails {
  optionSubscriptionId: number;
  optionName: string;
  optionStatus: TOptionStatus;
  activationDate: IsoDate;
  deactivationDate: IsoDate;
  amountFullCur: number;
  paymentPeriodFrom: IsoDate;
  paymentPeriodTo: IsoDate;
  accountCode: string;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}
