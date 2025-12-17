import { IPeriodsList } from "@entities/periods/periods.types";
import { fakerRU as faker } from "@faker-js/faker";

export const generateStructuredPeriods = (): IPeriodsList[] => {
  const periods: IPeriodsList[] = [];
  const serviceIds = ["1", "2", "3"];
  const statusByService: Record<string, string[]> = {
    "1": ["Оплачено", "Ожидает оплаты", "Неоплачено"],
    "2": ["Ожидает оплаты", "Просрочено"],
    "3": ["Оплачено", "Частично оплачено"],
  };

  let idCounter = 1;

  serviceIds.forEach((serviceId) => {
    const periodsCount = faker.number.int({ min: 2, max: 4 });
    const statuses = statusByService[serviceId] || ["Ожидает оплаты"];

    for (let i = 0; i < periodsCount; i++) {
      const year = 2025;
      const month = faker.number.int({ min: 1, max: 12 });
      const dayBegin = faker.number.int({ min: 1, max: 15 });

      const dateBegin = new Date(year, month - 1, dayBegin);
      const dateEnd = new Date(dateBegin);
      dateEnd.setMonth(dateEnd.getMonth() + 1);
      dateEnd.setDate(dateEnd.getDate() - 1);

      const datePayBeg = new Date(dateBegin);
      const datePayEnd = new Date(dateEnd);
      datePayEnd.setDate(datePayEnd.getDate() + 10);

      const status = faker.helpers.arrayElement(statuses);
      let datePayFact = datePayEnd;

      if (status === "Оплачено") {
        datePayFact = faker.date.between({ from: datePayBeg, to: datePayEnd });
      }

      const baseAmount = faker.number.int({ min: 1000, max: 5000 });
      const additional = faker.number.int({ min: 0, max: 2000 });
      const total = baseAmount + additional;

      periods.push({
        id: String(idCounter++),
        serviceId,
        dateBegin: dateBegin.toLocaleDateString("ru-RU"),
        dateEnd: dateEnd.toLocaleDateString("ru-RU"),
        datePayBeg: datePayBeg.toLocaleDateString("ru-RU"),
        datePayEnd: datePayEnd.toLocaleDateString("ru-RU"),
        datePayFact: datePayFact.toLocaleDateString("ru-RU"),
        status,
        chargeAmount: baseAmount,
        additionalChargeAmount: additional,
        amountAccountRequirements: total,
        sumPay:
          status === "Оплачено"
            ? total
            : faker.number.int({ min: 0, max: total - 1 }),
        sumInc: faker.number.int({ min: 10000, max: 30000 }),
        sumDbp: faker.number.int({ min: 5000, max: 15000 }),
        paymentBehavior: "Пени",
        paymentPriorities: String(faker.number.int({ min: 10, max: 90 })),
        orderMeaning: "Оплаты услуги",
      });
    }
  });

  return periods;
};
