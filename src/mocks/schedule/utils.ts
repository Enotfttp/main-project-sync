import {
  EPaymentScheduleStatus,
  IPaymentSchedule,
} from "@entities/schedule/types";
import { fakerRU as faker } from "@faker-js/faker";

export const generateMockSchedules = (): IPaymentSchedule[] => {
  // Статусы с разной вероятностью для реалистичности
  const statuses: (keyof typeof EPaymentScheduleStatus)[] = [
    "CREATED",
    "COMPLETED",
    "CANCEL",
  ];

  // Коды процессов
  const processCodes = [
    "PAY_UTILITY",
    "TAX_PAYMENT",
    "SERVICE_FEE",
    "SUBSCRIPTION_PAY",
  ];

  // Валюты
  const currencies = ["RUB", "USD", "EUR", "CNY"];

  return Array.from({ length: 30 }, (_, index) => {
    const createdAt = faker.date.past({ years: 0.5 }); // создано в последние полгода
    const scheduleCreatedAt = faker.date.between({
      from: faker.date.past({ years: 0.1, refDate: createdAt }),
      to: new Date(),
    });

    // Определяем даты процесса в зависимости от статуса
    let processStartDate;
    let processEndDate: string | null = null;
    const status = faker.helpers.arrayElement(statuses);

    if (status === "COMPLETED") {
      processStartDate = faker.date.future({
        refDate: scheduleCreatedAt,
        years: 0.05,
      });

      processEndDate = faker.date
        .future({
          refDate: processStartDate,
          years: 0.03,
        })
        .toLocaleDateString("ru-RU");
    } else if (status === "CREATED") {
      // 50% вероятности, что процесс уже начался
      if (faker.datatype.boolean()) {
        processStartDate = faker.date.future({
          refDate: scheduleCreatedAt,
          years: 0.05,
        });
      }
    }

    processStartDate = processStartDate
      ? processStartDate.toLocaleDateString("ru-RU")
      : null;
    // Для CANCEL дат процесса нет

    // НДС данные (не всегда заполнены)
    const hasVat = faker.datatype.boolean({ probability: 0.7 });
    const vatRate = hasVat ? faker.helpers.arrayElement([0, 10, 20]) : null;
    const amountFull = faker.number.float({
      min: 1000,
      max: 50000,
      fractionDigits: 2,
    });

    return {
      id: index + 1000, // начинаем с 1000 для реалистичности
      comcRequestId: faker.number.int({ min: 50000, max: 99999 }),
      status,
      dataTrfId: `TRF-${faker.string.alphanumeric(8).toUpperCase()}`,
      dataName: `Платеж за ${faker.helpers.arrayElement([
        "коммунальные услуги",
        "налоговый сбор",
        "обслуживание",
        "подписку",
      ])}`,
      dataTrfNumber: faker.string.numeric(10),
      scheduleSourceGuid: faker.string.uuid(),
      scheduleCreatedAt: scheduleCreatedAt.toISOString(),
      utilityCurrencyTariff: faker.helpers.arrayElement(currencies),
      utilityAmountFullCur: amountFull,
      utilityPriority: faker.number.int({ min: 1, max: 10 }),
      vatDocumentTypeAmountFullNds:
        hasVat && vatRate && vatRate > 0
          ? faker.number.float({
              min: 100,
              max: amountFull * 0.2,
              fractionDigits: 2,
            })
          : null,
      vatDocumentTypeVatRate: vatRate,
      vatDocumentTypeAmountNdsCur:
        hasVat && vatRate && vatRate > 0
          ? faker.number.float({
              min: 50,
              max: 2000,
              fractionDigits: 2,
            })
          : null,
      processDocProcessCode: faker.helpers.arrayElement(processCodes),
      processDocProcessStartDate: processStartDate,
      processDocProcessEndDate: processEndDate,
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
