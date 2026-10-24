import { packageDb } from "@mocks/entities/package/factory";
import {
  createCollection,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  fakeUuid,
  faker,
} from "@mocks/lib";

/** Контракт бэкенда ещё не описан в `@entities/option/model/types`. */
export interface IOptionMock {
  optionId: UUID;
  packageId: UUID;
  name: string;
  status: "ACTIVE" | "DISABLED" | "PENDING";
  amountFullCur: number;
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
