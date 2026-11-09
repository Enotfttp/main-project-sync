import { packageDb } from "@mocks/entities/package/factory";
import {
  createCollection,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  faker,
  fakeUuid,
} from "@mocks/lib";

/** Контракт бэкенда ещё не описан в `@entities/option-info/model/types`. */
export interface IOptionMock {
  optionId: UUID;
  optionSubscriptionId: number;
  packageId: UUID;
  name: string;
  status: "ACTIVE" | "DISABLED" | "PENDING";
  amountFullCur: number;
  trfNumber: string;
  startDate: IsoDate;
  endDate: IsoDate;
  createdAt: IsoDate;
}

const optionNames = [
  "СМС-информирование",
  "Зарплатный проект",
  "Эквайринг",
  "Валютный контроль",
  "Дополнительный пользователь",
  "Корпоративная карта",
];

export const createOption = (): IOptionMock => {
  const createdAt = fakeIsoDate();
  const startDate = fakeFutureIsoDate(createdAt);

  return {
    optionId: fakeUuid(),
    optionSubscriptionId: faker.number.int({ min: 100_000, max: 999_999 }),
    trfNumber: faker.string.numeric(3),
    packageId: faker.helpers.arrayElement(packageDb.all()).packageId,
    name: faker.helpers.arrayElement(optionNames),
    status: faker.helpers.arrayElement(["ACTIVE", "DISABLED", "PENDING"]),
    amountFullCur: fakeAmount(),
    startDate,
    endDate: fakeFutureIsoDate(startDate),
    createdAt,
  };
};

export const optionDb = createCollection("optionId", createOption, 90);
