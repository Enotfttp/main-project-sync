import type {
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

  // Маппинг вероятностей статусов
  const statusProbabilities = {
    CREATED: 0.25,
    ACCEPTED: 0.15,
    REJECTED: 0.1,
    PROCESSED: 0.2,
    COMPLETED: 0.25,
    ERROR: 0.05,
  };

  // Маппинг resultType в зависимости от status
  const resultTypeByStatus: Record<
    TRequestTypeRequestStatus,
    TRequestTypeResultType[]
  > = {
    CREATED: ["PAYMENT_SUCCESS", "PAYMENT_DECLINE", "CARD_INDEX"],
    ACCEPTED: ["PAYMENT_SUCCESS", "CARD_INDEX"],
    REJECTED: ["PAYMENT_DECLINE", "ANNULMENT"],
    PROCESSED: ["CARD_INDEX", "PAYMENT_SUCCESS", "ANNULMENT"],
    COMPLETED: ["PAYMENT_SUCCESS", "PAYMENT_DECLINE", "CANCELLATION"],
    ERROR: ["PAYMENT_DECLINE", "CANCELLATION", "ANNULMENT"],
  };

  // Event types сгруппированы по категориям
  const eventTypes = {
    ACTIVATION: [
      "PACKAGE_ACTIVATION",
      "OPTION_ACTIVATION",
      "PRE_OPTION_ACTIVATION",
    ],
    PROLONGATION: ["PACKAGE_PROLONGATION", "OPTION_PROLONGATION"],
    CHANGE: ["PACKAGE_CHANGE", "PRIORITY_CHANGE", "SCHEDULE_UPDATE"],
    MIGRATION: ["PACKAGE_MIGRATION", "OPTION_MIGRATION"],
    DISABLE: ["DISABLE_OPTION", "CANCEL_FEE"],
  };

  const allEventTypes = Object.values(
    eventTypes,
  ).flat() as TRequestTypeEventType[];

  for (let i = 0; i < count; i++) {
    // Генерация базовых дат
    const requestCreatedAt = faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: "2024-12-31T23:59:59.999Z",
    });

    const createdAt = faker.date.between({
      from: new Date(requestCreatedAt.getTime() - 2 * 24 * 60 * 60 * 1000), // -2 дня
      to: requestCreatedAt,
    });

    const updatedAt = faker.date.between({
      from: requestCreatedAt,
      to: new Date(),
    });

    // Выбор статуса на основе вероятностей
    const randomStatus = Math.random();
    let cumulativeProbability = 0;
    let status: TRequestTypeRequestStatus = "CREATED";

    for (const [stat, prob] of Object.entries(statusProbabilities)) {
      cumulativeProbability += prob;
      if (randomStatus < cumulativeProbability) {
        status = stat as TRequestTypeRequestStatus;
        break;
      }
    }

    // Выбор resultType в зависимости от статуса
    const availableResultTypes = resultTypeByStatus[status];
    const resultType = faker.helpers.arrayElement(availableResultTypes);

    // Выбор eventType
    const eventType = faker.helpers.arrayElement(allEventTypes);

    // Генерация ошибок для соответствующих статусов
    let errorCode = "";
    let errorMessage = "";

    if (status === "REJECTED" || status === "ERROR") {
      const errorCodes = [
        "ERR-001",
        "ERR-002",
        "ERR-003",
        "VALIDATION_ERROR",
        "PAYMENT_FAILED",
      ];
      const errorMessages = [
        "Недостаточно средств на счете",
        "Ошибка подключения к платежной системе",
        "Истек срок действия карты",
        "Неверные реквизиты",
        "Превышен лимит операций",
        "Техническая ошибка сервера",
      ];

      errorCode = faker.helpers.arrayElement(errorCodes);
      errorMessage = faker.helpers.arrayElement(errorMessages);
    }

    // Генерация content в зависимости от eventType
    // TODO сделать контент
    // const content = faker.;

    requests.push({
      id: i + 1,
      incomingMessageId: faker.number.int({ min: 1000, max: 9999 }),
      packageSubscriptionId: faker.number.int({ min: 5000, max: 5010 }),
      requestId: faker.number.int({ min: 2000, max: 2999 }),
      status,
      resultType,
      errorCode,
      errorMessage,
      requestCreatedAt: requestCreatedAt.toISOString(),
      eventType,
      content: null,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  }

  return requests;
};
