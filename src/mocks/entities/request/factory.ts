import {
  EventType,
  IErrorInfo,
  IRequestHistoryInfo,
  IRequestInfo,
  IRequestInfoDetails,
  PutToOutboxStatus,
  RequestStatus,
  ResultType,
} from "@entities/request/model";
import { scheduleDb } from "@mocks/entities/schedule/factory";
import {
  createCollection,
  fakeAmount,
  fakeFutureIsoDate,
  fakeInn,
  fakeIsoDate,
  faker,
  fakeUuid,
} from "@mocks/lib";
import { keysOf } from "@shared/lib";

type TRequestInfo = IRequestInfo[][number];
type TRequestHistoryInfo = IRequestHistoryInfo[][number];
type TErrorInfo = NonNullable<IErrorInfo>;

export type TRequestMock = TRequestInfo & {
  accountCode: string;
  inn: string;
  details: IRequestInfoDetails;
  history: IRequestHistoryInfo;
  content: string;
  errorInfo?: TErrorInfo;
};

const eventTypes = keysOf(EventType);
const requestStatuses = keysOf(RequestStatus);
const resultTypes = keysOf(ResultType);
const putToOutboxStatuses = keysOf(PutToOutboxStatus);

export const createRequest = (): TRequestMock => {
  const schedule = faker.helpers.arrayElement(scheduleDb.all());
  const requestId = fakeUuid();
  const requestHistoryId = fakeUuid();
  const eventType = faker.helpers.arrayElement(eventTypes);
  const requestStatus = faker.helpers.arrayElement(requestStatuses);
  const resultType =
    requestStatus === "COMPLETED"
      ? faker.helpers.arrayElement(resultTypes)
      : undefined;
  const requestDate = fakeIsoDate();
  const createdAt = fakeFutureIsoDate(requestDate);
  const updatedAt = fakeFutureIsoDate(createdAt);
  const accountCode = schedule.details.accountCode;
  const content = JSON.stringify(
    {
      requestId,
      eventType,
      accountCode,
      amount: fakeAmount(),
      comment: faker.lorem.sentence(),
    },
    null,
    2,
  );

  const errorInfo =
    requestStatus === "ERROR"
      ? {
          errorCode: `E-${faker.string.numeric(3)}`,
          errorMessage: faker.lorem.sentence(),
        }
      : undefined;

  return {
    requestId,
    date: requestDate,
    eventType,
    requestStatus,
    resultType,
    accountCode,
    inn: fakeInn(),
    content,
    errorInfo,
    details: {
      requestId,
      scheduleSourceGuid: schedule.scheduleSourceGuid,
      packageSubscriptionId: schedule.details.packageInfo.packageSubscriptionId,
      requestDate,
      requestCreated: createdAt,
      eventType,
      requestStatus,
      resultType,
      accountCode,
      createdAt,
      updatedAt,
      ...errorInfo,
    },
    history: {
      requestHistoryId,
      eventType,
      requestStatus,
      resultType,
      putToOutboxStatus: faker.helpers.arrayElement(putToOutboxStatuses),
      content,
      createdAt,
      updatedAt,
      ...errorInfo,
    },
  };
};

export const requestDb = createCollection("requestId", createRequest, 120);

export const toRequestInfo = ({
  requestId,
  date,
  eventType,
  requestStatus,
  resultType,
}: TRequestMock): TRequestInfo => ({
  requestId,
  date,
  eventType,
  requestStatus,
  resultType,
});

export const toRequestHistoryInfo = ({
  history,
}: TRequestMock): TRequestHistoryInfo => ({
  ...history,
});
