import {
  EventType,
  IScheduleInfo,
  IScheduleInfoDetails,
  ProcessCode,
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

export type TScheduleMock = TScheduleInfo & {
  details: IScheduleInfoDetails;
};

const scheduleStatuses = keysOf(ScheduleStatus);
const processCodes = keysOf(ProcessCode);
const eventTypes = keysOf(EventType);

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
        name: opt.optionName,
        trfNumber: faker.string.numeric(4),
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
      requiresPriorityChange: faker.datatype.boolean(),
    },
  };
};

export const scheduleDb = createCollection(
  "scheduleSourceGuid",
  createSchedule,
  60,
);

export const toScheduleInfo = ({
  details: _details,
  ...info
}: TScheduleMock): TScheduleInfo => info;
