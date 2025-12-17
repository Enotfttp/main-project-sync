import {
  ComcRequestStatus,
  ComcResultType,
  IRequestHistory,
  RequestHistoryKafkaStatus,
} from "@entities/history/types";
import { fakerRU as faker } from "@faker-js/faker";

export const generateMockHistories = (options?: {
  // Опциональные ID для связей между сущностями
  comcRequestIds?: number[];
  packageSubscriptionIds?: number[];
  // Распределение статусов
  statusDistribution?: Partial<Record<ComcRequestStatus, number>>;
}): IRequestHistory[] => {
  // Статусы запросов с реалистичным распределением по умолчанию
  const getRandomStatus = (): ComcRequestStatus => {
    const rand = Math.random();
    if (rand < 0.3) return "COMPLETED"; // 30% завершенных
    if (rand < 0.5) return "PROCESSED"; // 20% в обработке
    if (rand < 0.65) return "ACCEPTED"; // 15% принятых
    if (rand < 0.75) return "CREATED"; // 10% созданных
    if (rand < 0.9) return "REJECTED"; // 15% отклоненных
    return "ERROR"; // 10% ошибок
  };

  // Типы результатов в зависимости от статуса
  const getResultTypeForStatus = (
    status: ComcRequestStatus,
  ): ComcResultType | null => {
    switch (status) {
      case "COMPLETED":
        return faker.helpers.arrayElement(["PAYMENT_SUCCESS", "CARD_INDEX"]);
      case "REJECTED":
        return faker.helpers.arrayElement(["PAYMENT_DECLINE", "CANCELLATION"]);
      case "ERROR":
        return faker.helpers.arrayElement(["ANNULMENT", "PAYMENT_DECLINE"]);
      default:
        return null;
    }
  };

  // Статусы отправки в Kafka
  const getKafkaStatusForRequest = (
    status: ComcRequestStatus,
  ): RequestHistoryKafkaStatus => {
    switch (status) {
      case "CREATED":
        return faker.helpers.arrayElement(["CREATED", "DO_NOT_SEND"]);
      case "PROCESSED":
      case "ACCEPTED":
        return "PROCESSED";
      case "COMPLETED":
      case "REJECTED":
        return faker.datatype.boolean({ probability: 0.8 })
          ? "PROCESSED"
          : "ERROR";
      case "ERROR":
        return faker.helpers.arrayElement(["ERROR", "DO_NOT_SEND"]);
      default:
        return "PROCESSED";
    }
  };

  // Статус коды и описания
  const statusCodes = ["00", "01", "05", "12", "51", "55", "61", "91"];
  const statusDescriptions = [
    "Успешная операция",
    "Недостаточно средств",
    "Неверный формат запроса",
    "Недействительная карта",
    "Отказ эмитента",
    "Превышен лимит",
    "Ошибка тайм-аута",
    "Техническая ошибка",
  ];

  // Генерация контента запроса
  const generateContent = (status: ComcRequestStatus): Record<string, any> => {
    const baseContent = {
      requestData: {
        amount: faker.number.float({ min: 100, max: 50000, fractionDigits: 2 }),
        currency: faker.helpers.arrayElement(["RUB", "USD", "EUR"]),
        transactionId: `TRX-${faker.string.alphanumeric(10).toUpperCase()}`,
        timestamp: new Date().toISOString(),
      },
      metadata: {
        sourceSystem: faker.helpers.arrayElement([
          "ERP",
          "CRM",
          "BANK",
          "PAYMENT_GATEWAY",
        ]),
        userId: faker.number.int({ min: 1000, max: 9999 }),
        sessionId: faker.string.uuid(),
      },
    };

    // Дополнительные поля в зависимости от статуса
    if (status === "COMPLETED" || status === "PROCESSED") {
      Object.assign(baseContent, {
        processingDetails: {
          processor: faker.company.name(),
          processingTime: faker.number.int({ min: 100, max: 5000 }),
          authorizationCode: `AUTH-${faker.string.numeric(6)}`,
        },
      });
    }

    if (status === "ERROR" || status === "REJECTED") {
      Object.assign(baseContent, {
        errorDetails: {
          errorCode: `ERR-${faker.string.numeric(4)}`,
          retryable: faker.datatype.boolean(),
          suggestedAction: faker.helpers.arrayElement([
            "Повторить попытку",
            "Обратиться в поддержку",
            "Проверить данные карты",
          ]),
        },
      });
    }

    return baseContent;
  };

  // Используем переданные ID или генерируем случайные
  const comcRequestIds =
    options?.comcRequestIds ||
    Array.from({ length: 20 }, (_, i) => 10000 + i * 50);

  const packageSubscriptionIds =
    options?.packageSubscriptionIds ||
    Array.from({ length: 50 }, (_, i) => 1 + i);

  return Array.from({ length: 30 }, (_, index) => {
    const createdAt = faker.date.past({ years: 0.3 }); // записи за последние 4 месяца
    const status = getRandomStatus();
    const resultType = getResultTypeForStatus(status);

    // Для некоторых записей генерируем статус код и описание
    const hasStatusCode = faker.datatype.boolean({ probability: 0.7 });
    const statusCodeIndex = hasStatusCode
      ? faker.number.int({ min: 0, max: statusCodes.length - 1 })
      : -1;

    return {
      id: 10000 + index, // начинаем с 10000
      comcRequestId: faker.datatype.boolean({ probability: 0.8 })
        ? faker.helpers.arrayElement(comcRequestIds)
        : null,
      requestId: faker.string.uuid(),
      packageSubscriptionId: faker.helpers.arrayElement(packageSubscriptionIds),
      status,
      resultType: resultType,
      statusCode:
        hasStatusCode && statusCodeIndex >= 0
          ? statusCodes[statusCodeIndex]
          : null,
      statusDescription:
        hasStatusCode && statusCodeIndex >= 0
          ? statusDescriptions[statusCodeIndex]
          : null,
      kafkaSendStatus: getKafkaStatusForRequest(status),
      createdAt: createdAt.toISOString(),
      updatedAt: faker.date
        .between({
          from: createdAt,
          to: new Date(),
        })
        .toISOString(),
      content: generateContent(status),
    };
  });
};
