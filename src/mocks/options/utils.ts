import { EOptionStatus, IOption } from "@entities/options/types";
import { fakerRU as faker } from "@faker-js/faker";

const statuses = Object.keys(EOptionStatus) as Array<
  keyof typeof EOptionStatus
>;

export const generateMockOptions = (): IOption[] => {
  return Array.from({ length: 30 }, (_, index) => {
    const createdAt = faker.date.past({ years: 1 });
    const activationDate = faker.date.future({
      refDate: createdAt,
      years: 0.1,
    });

    // Для неактивных статусов указываем дату деактивации
    const isActive = faker.helpers.arrayElement([true, false]);
    let deactivationDateTime: string | null = null;

    if (!isActive) {
      deactivationDateTime = faker.date
        .future({
          refDate: activationDate,
          years: 0.3,
        })
        .toLocaleDateString("ru-RU");
    }

    return {
      id: index + 1,
      packageId: faker.number.int({ min: 1, max: 10 }),
      payerId: faker.number.int({ min: 1000, max: 9999 }),
      optionSubscriptionId: faker.number.int({ min: 100, max: 500 }),
      status: faker.helpers.arrayElement(statuses),
      activationDateTime: activationDate.toLocaleDateString("ru-RU"),
      deactivationDateTime: deactivationDateTime,
      createdAt: createdAt.toLocaleDateString("ru-RU"),
      updatedAt: faker.date
        .between({
          from: createdAt,
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
    };
  });
};
