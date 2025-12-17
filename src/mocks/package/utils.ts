import { IPackage, PackageStatus } from "@entities/package/types";
import { fakerRU as faker } from "@faker-js/faker";

export const generateMockPackages = (payerIds?: number[]): IPackage[] => {
  const availablePayerIds =
    payerIds || Array.from({ length: 10 }, (_, i) => 1000 + i * 100);

  const getRandomStatus = (): PackageStatus => {
    const rand = Math.random();
    if (rand < 0.6) return "ACTIVE";
    if (rand < 0.85) return "INACTIVE";
    return "CREATED";
  };

  return Array.from({ length: 30 }, (_, index) => {
    const createdAt = faker.date.past({ years: 1 });
    const status = getRandomStatus();

    // Для активных/неактивных - активация была в прошлом
    const activationDateTimeFrom = faker.date.between({
      from: faker.date.past({ years: 0.5, refDate: createdAt }),
      to: new Date(),
    });

    // Для неактивных - добавляем дату деактивации
    const deactivationDateTime = faker.date
      .between({
        from: activationDateTimeFrom,
        to: new Date(),
      })
      .toLocaleDateString("ru-RU");

    // Активация в будущем
    const activationDateTime = faker.date
      .future({ years: 0.3 })
      .toLocaleDateString("ru-RU");

    const accountNumber = faker.helpers.arrayElement([
      `40817${faker.string.numeric(15)}`,
      `40820${faker.string.numeric(15)}`,
      `40702${faker.string.numeric(15)}`,
      `ACC-${faker.string.alphanumeric(8).toUpperCase()}`,
    ]);

    return {
      id: 5000 + index,
      payerId: faker.helpers.arrayElement(availablePayerIds),
      subscriptionId: faker.number.int({ min: 1, max: 50 }),
      status,
      accountNumber: accountNumber,
      activationDateTime: activationDateTime, // Теперь всегда инициализировано
      deactivationDateTime: deactivationDateTime || "", // Теперь всегда инициализировано
      createdAt: createdAt.toISOString(),
      updatedAt: faker.date
        .between({
          from: createdAt,
          to: new Date(),
        })
        .toISOString(),
    };
  });
};
