import {
  EventType,
  IRequestDetails,
  IRequestHistory,
  IRequestInfo,
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
type TErrorInfo = NonNullable<IRequestDetails["errorInfo"]>;

export type TRequestMock = TRequestInfo & {
  accountCode: string;
  inn: string;
  details: IRequestDetails["requestInfo"];
  history: IRequestHistory["requestHistory"];
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

  return {
    requestId,
    date: requestDate,
    eventType,
    requestStatus,
    resultType,
    accountCode,
    inn: fakeInn(),
    content,
    errorInfo:
      requestStatus === "ERROR"
        ? {
            errorCode: `E-${faker.string.numeric(3)}`,
            errorMessage: faker.lorem.sentence(),
          }
        : undefined,
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
    },
    history: {
      requestId,
      eventType,
      requestStatus,
      resultType,
      putToOutboxStatus: faker.helpers.arrayElement(putToOutboxStatuses),
      content,
      createdAt,
      updatedAt,
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
