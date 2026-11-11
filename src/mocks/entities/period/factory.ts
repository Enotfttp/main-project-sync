import {
  IPeriodInfo,
  IScheduleInfo,
  PeriodStatus,
  ResultType,
} from "@entities/schedule/model";
import { scheduleDb } from "@mocks/entities/schedule/factory";
import {
  createCollection,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  faker,
  fakeUuid,
} from "@mocks/lib";
import { keysOf } from "@shared/lib";

export type TPeriodMock = IPeriodInfo & {
  scheduleSourceGuid: IScheduleInfo["scheduleSourceGuid"];
};

const periodStatus = keysOf(PeriodStatus);
const resultTypes = keysOf(ResultType);

const createPeriod = (): TPeriodMock => {
  const schedule = faker.helpers.arrayElement(scheduleDb.all());
  const createdAt = fakeIsoDate();
  const startDate = fakeFutureIsoDate(createdAt);
  const endDate = fakeFutureIsoDate(startDate);

  return {
    scheduleSourceGuid: schedule.scheduleSourceGuid,
    periodId: fakeUuid(),
    status: faker.helpers.arrayElement(periodStatus),
    resultType: faker.helpers.arrayElement(resultTypes),
    startDate,
    endDate,
    amount: fakeAmount(),
    additionalAmount: fakeAmount(),
  };
};

export const periodDb = createCollection("periodId", createPeriod, 80);

export const toPeriodInfo = ({
  scheduleSourceGuid: _scheduleSourceGuid,
  ...info
}: TPeriodMock): IPeriodInfo => info;
