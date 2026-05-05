import {
  EPeriodsResultType,
  EPeriodsStatus,
  IPeriods,
} from "@entities/periods/types";
import { faker } from "@faker-js/faker/locale/ru";

export const generateStructuredPeriods = (): IPeriods[] => {
  const periods: IPeriods[] = [];

  const resultTypes = Object.keys(EPeriodsResultType) as Array<
    keyof typeof EPeriodsResultType
  >;

  const statusPeriods = Object.keys(EPeriodsStatus) as Array<
    keyof typeof EPeriodsStatus
  >;

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

    periods.push({
      id: i + 1,
      periodId: faker.string.uuid(),
      resultType: faker.helpers.arrayElement(resultTypes),
      startDate: startDate.toISOString().split("T")[0], // Формат YYYY-MM-DD
      endDate: endDate.toISOString().split("T")[0],
      status: faker.helpers.arrayElement(statusPeriods),
      amount: faker.number.float({ min: 1000, max: 50000 }),
      additionalAmount: faker.number.float({ min: 0, max: 5000 }),
      periodNumber: faker.number.int({ min: 1, max: 1000 }),
      inGroupOperation: faker.datatype.boolean(),
      updatedAt: updatedAt.toISOString(),
    });
  }

  return periods;
};
