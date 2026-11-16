export interface ICorrectionalScenarioFilter {
  accountCode: string;
}

export interface ICorrectionalScenario {
  accountCode: string;
  iterimAccountId: string;
  iterimAccountCode: string;
  accrueAccountId: string;
  accrueAccountCode: string;
  updatedAt: IsoDateTime;
}

export interface IAccountInfo {
  accountCode: string;
  iterimAccountId: string;
  iterimAccountCode: string;
  accrueAccountId: string;
  accrueAccountCode: string;
  iterimAccountIdOld: string;
  iterimAccountCodeOld: string;
  accrueAccountIdOld: string;
  accrueAccountCodeOld: string;
}

export interface ICorrectionRequest {
  correctionRequestId: UUID;
}

export type TCorrectionRequestStatus =
  | "CREATED"
  | "PROCESSED"
  | "COMPLETED"
  | "ERROR";

export interface ICorrectionStatus {
  correctionRequestStatus: TCorrectionRequestStatus;
}
