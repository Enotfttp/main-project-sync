import {
  IPeriods,
  PeriodsResultType,
  PeriodsStatus,
} from "@entities/periods/periods.types";
import { faker } from "@faker-js/faker/locale/ru";

export const generateStructuredPeriods = (): IPeriods[] => {
  const periods: IPeriods[] = [];

  // Типы результатов в правильном формате
  const resultTypes: PeriodsResultType[] = [
    "ITERIM_ACCOUNT",
    "BANK_INCOME_ACCOUNT",
    "ANNULMENT",
  ];

  // Маппинг статусов для логики генерации
  const statusMapping = {
    CREATED: { probability: 0.5, canHaveAmount: true },
    COMPLETED: { probability: 0.3, canHaveAmount: true },
    CANCEL: { probability: 0.2, canHaveAmount: false },
  };

  for (let i = 0; i < 30; i++) {
    // Генерация дат
    const startDate = faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: "2024-12-31T23:59:59.999Z",
    });

    const endDate = faker.date.between({
      from: startDate,
      to: new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000), // +30 дней
    });

    const createdAt = faker.date.between({
      from: new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000), // -7 дней от startDate
      to: startDate,
    });

    const updatedAt = faker.date.between({
      from: createdAt,
      to: new Date(),
    });

    // Выбор статуса на основе вероятности
    const randomStatus = Math.random();
    let status: PeriodsStatus;

    if (randomStatus < statusMapping.CREATED.probability) {
      status = "CREATED";
    } else if (
      randomStatus <
      statusMapping.CREATED.probability + statusMapping.COMPLETED.probability
    ) {
      status = "COMPLETED";
    } else {
      status = "CANCEL";
    }

    // Выбор типа результата в зависимости от статуса
    let resultType: PeriodsResultType;
    if (status === "COMPLETED") {
      resultType = faker.helpers.arrayElement([
        "ITERIM_ACCOUNT",
        "BANK_INCOME_ACCOUNT",
      ]);
    } else if (status === "CANCEL") {
      resultType = "ANNULMENT";
    } else {
      resultType = faker.helpers.arrayElement(resultTypes);
    }

    // Генерация сумм в зависимости от статуса
    const baseAmount = statusMapping[status].canHaveAmount
      ? faker.number.float({ min: 1000, max: 50000 })
      : faker.number.float({ min: 0, max: 1000 });

    const additionalAmount = statusMapping[status].canHaveAmount
      ? faker.number.float({ min: 0, max: 5000 })
      : 0;

    periods.push({
      id: i + 1,
      resultType: resultType,
      startDate: startDate.toISOString().split("T")[0], // Формат YYYY-MM-DD
      endDate: endDate.toISOString().split("T")[0],
      status: status,
      amount: baseAmount,
      additionalAmount: additionalAmount,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  }

  return periods;
};
