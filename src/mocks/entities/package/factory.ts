import {
  IPackageInfo,
  IPackageInfoDetails,
  PackageStatus,
} from "@entities/package/model";
import {
  createCollection,
  fakeAccountCode,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  faker,
} from "@mocks/lib";
import { keysOf } from "@shared/lib";

export type IPackageMock = IPackageInfo & {
  details: IPackageInfoDetails;
};

const packageStatuses = keysOf(PackageStatus);

const packageNames = [
  "Базовый",
  "Оптимальный",
  "Бизнес-старт",
  "Бизнес-про",
  "Всё включено",
  "Внешнеэкономический",
];

export const createPackage = (): IPackageMock => {
  const packageSubscriptionId = faker.number.int({
    min: 100_000,
    max: 999_999,
  });
  const packageName = `Пакет «${faker.helpers.arrayElement(packageNames)}»`;
  const packageStatus = faker.helpers.arrayElement(packageStatuses);
  const activationDate = fakeIsoDate();
  const deactivationDate = fakeFutureIsoDate(activationDate);
  const paymentPeriodFrom = fakeIsoDate();
  const paymentPeriodTo = fakeFutureIsoDate(paymentPeriodFrom);
  const amountFullCur = fakeAmount();
  const createdAt = fakeIsoDate();

  return {
    packageSubscriptionId,
    packageName,
    packageStatus,
    activationDate,
    deactivationDate,
    amountFullCur,
    paymentPeriodFrom,
    paymentPeriodTo,
    details: {
      packageSubscriptionId,
      packageName,
      packageStatus,
      activationDate,
      deactivationDate,
      amountFullCur,
      paymentPeriodFrom,
      paymentPeriodTo,
      accountNumber: faker.string.numeric(5),
      accountCode: fakeAccountCode(),
      createdAt,
      updatedAt: fakeFutureIsoDate(createdAt),
    },
  };
};

export const packageDb = createCollection(
  "packageSubscriptionId",
  createPackage,
  30,
);

export const toPackageInfo = ({
  details: _details,
  ...info
}: IPackageMock): IPackageInfo => info;
