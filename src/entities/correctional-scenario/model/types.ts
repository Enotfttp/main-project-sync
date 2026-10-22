export interface ICorrectionalScenarioFilter {
  packageSubscriptionId: number;
  accountCode: string;
}

export interface ICorrectionalScenario {
  packageSubscriptionId: number;
  accountCode: string;
  accountInfo: IAccountInfo;
}

export interface IAccountInfo {
  iterimAccountCode: string;
  accrueAccountCode: string;
}
