export interface ICorrectionalScenarioFilter {
  accountCode: string;
}

export interface ICorrectionalScenario {
  id: UUID;
  packageSubscriptionId: number;
  accountCode: string;
  updatedAt: IsoDate;
  accountInfo: IAccountInfo;
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
