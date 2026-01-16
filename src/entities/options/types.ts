export type OptionStatus = "CREATED" | "ACTIVE" | "INACTIVE";

export const OptionStatusText = {
  CREATED: "Новая подписка",
  ACTIVE: "Активная подписка",
  INACTIVE: "Неактивная подписка",
};

export interface IOption {
  id: number;
  packageId: number;
  payerId: number;
  optionSubscriptionId: number;
  status: OptionStatus;
  activationDateTime: string;
  deactivationDateTime?: string | null;
  createdAt: string;
  updatedAt: string;
}
