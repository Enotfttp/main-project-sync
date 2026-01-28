import {
  IRequestType,
  TRequestTypeEventType,
  TRequestTypeRequestStatus,
  TRequestTypeResultType,
} from "@entities/requestTypes/types";
import { faker } from "@faker-js/faker/locale/ru";

export const generateStructuredRequestTypes = (
  count: number = 10,
): IRequestType[] => {
  const requests: IRequestType[] = [];

  // Все статусы, которые должны быть гарантированно
  const allStatuses: TRequestTypeRequestStatus[] = [
    "CREATED",
    "ACCEPTED",
    "REJECTED",
    "PROCESSED",
    "COMPLETED",
    "ERROR",
  ];

  // Все возможные event types
  const allEventTypes: TRequestTypeEventType[] = [
    "PACKAGE_ACTIVATION",
    "OPTION_ACTIVATION",
    "PRE_OPTION_ACTIVATION",
    "PACKAGE_PROLONGATION",
    "OPTION_PROLONGATION",
    "PACKAGE_CHANGE",
    "PRIORITY_CHANGE",
    "SCHEDULE_UPDATE",
    "PACKAGE_MIGRATION",
    "OPTION_MIGRATION",
    "DISABLE_OPTION",
    "CANCEL_FEE",
  ];

  // 1. Сначала создаем по одной записи для каждого статуса (гарантированно)
  allStatuses.forEach((status, index) => {
    const eventType = faker.helpers.arrayElement(allEventTypes);

    const requestCreatedAt = faker.date.past({ years: 1 });
    const createdAt = faker.date.past({ refDate: requestCreatedAt });
    const updatedAt = faker.date.between({
      from: requestCreatedAt,
      to: new Date(),
    });

    // Простая логика для resultType
    let resultType: TRequestTypeResultType = "PAYMENT_SUCCESS";
    if (status === "REJECTED" || status === "ERROR") {
      resultType = faker.helpers.arrayElement([
        "PAYMENT_DECLINE",
        "ANNULMENT",
        "CANCELLATION",
      ]);
    }

    requests.push({
      id: index + 1,
      incomingMessageId: faker.number.int({ min: 1000, max: 9999 }),
      packageSubscriptionId: faker.number.int({ min: 1, max: 100 }),
      requestId: faker.number.int({ min: 1000, max: 9999 }),
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
      id: i + 1,
      incomingMessageId: faker.number.int({ min: 1000, max: 9999 }),
      packageSubscriptionId: faker.number.int({ min: 1, max: 100 }),
      requestId: faker.number.int({ min: 1000, max: 9999 }),
      status,
      resultType: faker.helpers.arrayElement([
        "PAYMENT_SUCCESS",
        "PAYMENT_DECLINE",
        "CARD_INDEX",
      ]),
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
      content: null,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  }

  // Перемешиваем результат
  return [...requests].sort(() => 0.5 - Math.random());
};
