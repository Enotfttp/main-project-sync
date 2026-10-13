export interface ICorrectionalScenarioFilter {
  packageSubscriptionId: number;
  accountCode: string;
}

export interface ICorrectionalScenario {
  packageSubscriptionId: number;
  accountCode: string;
  accountInfo: IAccountInfo;
}

interface IAccountInfo {
  iterimAccountCode: string;
  accrueAccountCode: string;
}
