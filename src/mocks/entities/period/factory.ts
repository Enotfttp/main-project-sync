import { scheduleDb } from "@mocks/entities/schedule/factory";
import {
  createCollection,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  fakeUuid,
  faker,
} from "@mocks/lib";

/** Контракт бэкенда ещё не описан в `@entities/period/model/types`. */
export interface IPeriodMock {
  periodId: UUID;
  scheduleSourceGuid: UUID;
  status: "PLANNED" | "PAID" | "OVERDUE" | "CANCELLED";
  amountFullCur: number;
  startDate: IsoDate;
  endDate: IsoDate;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

export const createPeriod = (): IPeriodMock => {
  const createdAt = fakeIsoDate();
  const startDate = fakeFutureIsoDate(createdAt);

  return {
    periodId: fakeUuid(),
    scheduleSourceGuid: faker.helpers.arrayElement(scheduleDb.all())
      .scheduleSourceGuid,
    status: faker.helpers.arrayElement([
      "PLANNED",
      "PAID",
      "OVERDUE",
      "CANCELLED",
    ]),
    amountFullCur: fakeAmount(),
    startDate,
    endDate: fakeFutureIsoDate(startDate),
    createdAt,
    updatedAt: fakeFutureIsoDate(createdAt),
  };
};

export const periodDb = createCollection("periodId", createPeriod, 80);
