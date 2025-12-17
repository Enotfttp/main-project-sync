export type PackageStatus = "CREATED" | "ACTIVE" | "INACTIVE";

export const PackageStatusText = {
  CREATED: "Новая подписка",
  ACTIVE: "Активная подписка",
  INACTIVE: "Неактивная подписка",
};

export interface IPackage {
  id: number;
  payerId: number;
  subscriptionId: number;
  status: PackageStatus;
  accountNumber: string;
  activationDateTime: string;
  deactivationDateTime?: string | null;
  createdAt: string;
  updatedAt: string;
}
