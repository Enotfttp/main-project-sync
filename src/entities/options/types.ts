export enum EOptionStatus {
  CREATED = "Новая подписка",
  ACTIVE = "Активная подписка",
  INACTIVE = "Неактивная подписка",
  DISABLED = "Опция отключена",
}

export interface IOption {
  id: number;
  packageId: number;
  payerId: number;
  optionSubscriptionId: number;
  status: keyof typeof EOptionStatus;
  activationDateTime: string; // TIMESTAMPTZ
  deactivationDateTime?: string | null; // TIMESTAMPTZ
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}
