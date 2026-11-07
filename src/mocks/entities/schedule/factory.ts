import {
  EventType,
  IScheduleInfo,
  IScheduleInfoDetails,
  ISchedulePeriods,
  ProcessCode,
  PutToOutboxStatus,
  RequestStatus,
  ResultType,
  ScheduleStatus,
} from "@entities/schedule/model";
import { optionDb } from "@mocks/entities/option/factory";
import { packageDb } from "@mocks/entities/package/factory";
import {
  createCollection,
  fakeAmount,
  fakeFutureIsoDate,
  fakeIsoDate,
  faker,
  fakeUuid,
} from "@mocks/lib";
import { keysOf } from "@shared/lib";

type TScheduleInfo = IScheduleInfo[][number];
type TPeriodInfo = ISchedulePeriods["periodsInfo"][number];

export type TScheduleMock = TScheduleInfo & {
  details: IScheduleInfoDetails;
  periods: TPeriodInfo[];
};

const scheduleStatuses = keysOf(ScheduleStatus);
const processCodes = keysOf(ProcessCode);
const eventTypes = keysOf(EventType);
const requestStatuses = keysOf(RequestStatus);
const resultTypes = keysOf(ResultType);
const putToOutboxStatuses = keysOf(PutToOutboxStatus);

const createPeriod = (): TPeriodInfo => {
  const createdAt = fakeIsoDate();

  return {
    requestId: fakeUuid(),
    eventType: faker.helpers.arrayElement(eventTypes),
    requestStatus: faker.helpers.arrayElement(requestStatuses),
    resultType: faker.helpers.arrayElement(resultTypes),
    putToOutboxStatus: faker.helpers.arrayElement(putToOutboxStatuses),
    content: JSON.stringify({ amount: fakeAmount() }),
    createdAt,
    updatedAt: fakeFutureIsoDate(createdAt),
  };
};

export const createSchedule = (): TScheduleMock => {
  const pkg = faker.helpers.arrayElement(packageDb.all());
  const opt = faker.helpers.arrayElement(optionDb.all());
  const scheduleSourceGuid = fakeUuid();
  const scheduleStatus = faker.helpers.arrayElement(scheduleStatuses);
  const processCode = faker.helpers.arrayElement(processCodes);
  const priority = faker.number.int({ min: 1, max: 10 });
  const createdAt = fakeIsoDate();
  const startDate = fakeFutureIsoDate(createdAt);
  const endDate = fakeFutureIsoDate(startDate);
  const amountFullCur = fakeAmount();
  const vatRate = faker.helpers.arrayElement([0, 10, 20]);
  const amountNdsCur = Number(((amountFullCur * vatRate) / 100).toFixed(2));

  return {
    scheduleSourceGuid,
    date: createdAt,
    scheduleStatus,
    startDate,
    endDate,
    amountFullCur,
    priority,
    processCode,
    details: {
      scheduleSourceGuid,
      scheduleStatus,
      scheduleCreatedAt: createdAt,
      scheduleCancelledAt:
        scheduleStatus === "CANCEL" ? fakeFutureIsoDate(createdAt) : undefined,
      eventType: faker.helpers.arrayElement(eventTypes),
      tbi: faker.string.numeric(4),
      priority,
      accountCode: pkg.details.accountCode,
      currencyAccount: faker.finance.currencyCode(),
      processCode,
      packageInfo: {
        packageSubscriptionId: pkg.packageSubscriptionId,
        name: pkg.details.packageName,
        trfNumber: faker.system.semver(),
      },
      optionInfo: {
        optionSubscriptionId: opt.optionSubscriptionId,
        name: opt.name,
        trfNumber: opt.trfNumber,
      },
      paymentInfo: {
        amountFullNdsCur: Number((amountFullCur + amountNdsCur).toFixed(2)),
        amountFullCur,
        vatRate,
        amountNdsCur,
        startDate,
        endDate,
      },
      createdAt,
      updatedAt: fakeFutureIsoDate(createdAt),
      requiresPriorityChange: faker.helpers.arrayElement(["Y", "N"]),
    },
    periods: faker.helpers.multiple(createPeriod, {
      count: { min: 1, max: 6 },
    }),
  };
};

export const scheduleDb = createCollection(
  "scheduleSourceGuid",
  createSchedule,
  60,
);

export const toScheduleInfo = ({
  details: _details,
  periods: _periods,
  ...info
}: TScheduleMock): TScheduleInfo => info;
