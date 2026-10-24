import { fakerRU } from "@faker-js/faker";

export const faker = fakerRU;

faker.seed(42);

export const fakeUuid = () => faker.string.uuid() as UUID;

export const fakeIsoDate = (refDate?: Date | string) =>
  faker.date.past({ years: 1, refDate }).toISOString() as IsoDate;

export const fakeFutureIsoDate = (refDate?: Date | string) =>
  faker.date.future({ years: 1, refDate }).toISOString() as IsoDate;

export const fakeAccountCode = () =>
  faker.finance.accountNumber(20).padStart(20, "4");

export const fakeInn = () => faker.string.numeric(10);

export const fakeAmount = () =>
  faker.number.float({ min: 100, max: 100_000, fractionDigits: 2 });
