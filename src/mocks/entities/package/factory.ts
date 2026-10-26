import {
  createCollection,
  fakeAccountCode,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  fakeUuid,
  faker,
} from "@mocks/lib";

/** Контракт бэкенда ещё не описан в `@entities/package/model/types`. */
export interface IPackageMock {
  packageId: UUID;
  packageSubscriptionId: number;
  name: string;
  trfNumber: string;
  accountCode: string;
  status: "ACTIVE" | "DISABLED" | "PENDING";
  amountFullCur: number;
  startDate: IsoDate;
  endDate: IsoDate;
  createdAt: IsoDate;
}

const packageNames = [
  "Базовый",
  "Оптимальный",
  "Бизнес-старт",
  "Бизнес-про",
  "Всё включено",
  "Внешнеэкономический",
];

export const createPackage = (): IPackageMock => {
  const createdAt = fakeIsoDate();
  const startDate = fakeFutureIsoDate(createdAt);

  return {
    packageId: fakeUuid(),
    packageSubscriptionId: faker.number.int({ min: 100_000, max: 999_999 }),
    name: `Пакет «${faker.helpers.arrayElement(packageNames)}»`,
    trfNumber: `TRF-${faker.string.numeric(5)}`,
    accountCode: fakeAccountCode(),
    status: faker.helpers.arrayElement(["ACTIVE", "DISABLED", "PENDING"]),
    amountFullCur: fakeAmount(),
    startDate,
    endDate: fakeFutureIsoDate(startDate),
    createdAt,
  };
};

export const packageDb = createCollection("packageId", createPackage, 30);
