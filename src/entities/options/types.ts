export enum EOptionStatus {
  CREATED = "Новая подписка",
  ACTIVE = "Активная подписка",
  INACTIVE = "Неактивная подписка",
}

export interface IOption {
  id: number;
  packageId: number;
  payerId: number;
  optionSubscriptionId: number;
  status: keyof typeof EOptionStatus;
  activationDateTime: string;
  deactivationDateTime?: string | null;
  createdAt: string;
  updatedAt: string;
}
