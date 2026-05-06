export enum EPackageStatus {
  CREATED = "Новая подписка",
  ACTIVE = "Активная подписка",
  INACTIVE = "Неактивная подписка",
}

export interface IPackage {
  id: number;
  payerId: number;
  subscriptionId: number;
  status: keyof typeof EPackageStatus;
  accountNumber: string;
  activationDateTime: string; // TIMESTAMPTZ
  deactivationDateTime?: string | null; // TIMESTAMPTZ
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}
