import {
  ERequestTypeRequestStatus,
  ERequestTypeResultType,
  ERequestTypesEventType,
  IRequestType,
} from "@entities/requestTypes/types";
import { faker } from "@faker-js/faker/locale/ru";

const allStatuses = Object.keys(ERequestTypeRequestStatus) as Array<
  keyof typeof ERequestTypeRequestStatus
>;

const allEventTypes = Object.keys(ERequestTypesEventType) as Array<
  keyof typeof ERequestTypesEventType
>;

const allResultType = Object.keys(ERequestTypeResultType) as Array<
  keyof typeof ERequestTypeResultType
>;

export const generateStructuredRequestTypes = (
  count: number = 10,
): IRequestType[] => {
  const requests: IRequestType[] = [];

  // 1. Сначала создаем по одной записи для каждого статуса (гарантированно)
  allStatuses.forEach((status) => {
    const eventType = faker.helpers.arrayElement(allEventTypes);

    const requestCreatedAt = faker.date.past({ years: 1 });
    const createdAt = faker.date.past({ refDate: requestCreatedAt });
    const updatedAt = faker.date.between({
      from: requestCreatedAt,
      to: new Date(),
    });

    // Простая логика для resultType
    let resultType: keyof typeof ERequestTypeResultType = "OPERATION_SUCCESS";
    if (status === "REJECTED" || status === "ERROR") {
      resultType = faker.helpers.arrayElement(allResultType);
    }

    requests.push({
      id: faker.string.uuid(),
      incomingMessageId: faker.number.int({ min: 1000, max: 9999 }),
      packageSubscriptionId: faker.number.int({ min: 1, max: 100 }),
      requestId: faker.string.uuid(),
      scheduleSourceGuid: faker.string.uuid(),
      status,
      resultType,
      errorCode:
        status === "REJECTED" || status === "ERROR"
          ? faker.helpers.arrayElement(["ERR-001", "ERR-002"])
          : "",
      errorMessage:
        status === "REJECTED" || status === "ERROR"
          ? faker.lorem.sentence()
          : "",
      requestCreatedAt: requestCreatedAt.toISOString(),
      eventType,
      attemptsCount: faker.number.int({ min: 1, max: 100 }),
      content: null,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  });

  // 2. Добавляем дополнительные записи до нужного количества
  for (let i = allStatuses.length; i < count; i++) {
    const status = faker.helpers.arrayElement(allStatuses);
    const eventType = faker.helpers.arrayElement(allEventTypes);

    const requestCreatedAt = faker.date.past({ years: 1 });
    const createdAt = faker.date.past({ refDate: requestCreatedAt });
    const updatedAt = faker.date.between({
      from: requestCreatedAt,
      to: new Date(),
    });

    requests.push({
      id: faker.string.uuid(),
      incomingMessageId: faker.number.int({ min: 1000, max: 9999 }),
      packageSubscriptionId: faker.number.int({ min: 1, max: 100 }),
      requestId: faker.string.uuid(),
      scheduleSourceGuid: faker.string.uuid(),
      status,
      resultType: faker.helpers.arrayElement(allResultType),
      errorCode:
        status === "REJECTED" || status === "ERROR"
          ? faker.helpers.arrayElement(["ERR-001", "ERR-002"])
          : "",
      errorMessage:
        status === "REJECTED" || status === "ERROR"
          ? faker.lorem.sentence()
          : "",
      requestCreatedAt: requestCreatedAt.toISOString(),
      eventType,
      attemptsCount: faker.number.int({ min: 1, max: 100 }),
      content: null,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  }

  // Перемешиваем результат
  return [...requests].sort(() => 0.5 - Math.random());
};
