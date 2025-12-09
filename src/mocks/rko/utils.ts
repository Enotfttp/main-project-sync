import { IRKOList } from "@entities/rko";
import { fakerRU as faker } from "@faker-js/faker";

export const generateMockRKOList = (): IRKOList[] => {
  // Список возможных клиентов (русские компании)
  const clients = [
    "МБАУМ ООО",
    "РОСТЕХНОЛОГИИ АО",
    "СИБИРСКИЙ ЦЕНТР ЗАО",
    "ДИАЛОГ СИСТЕМЫ ООО",
    "ТЕХНОИНВЕСТ ГК",
    "АЛЬФА-СЕРВИС ООО",
    "МОСКОВСКИЕ РЕШЕНИЯ АО",
    "УРАЛЬСКИЙ ХОЛДИНГ ЗАО",
    "ДИДЖИТАЛ ГРУПП ООО",
    "ИННОВАЦИОННЫЕ ТЕХНОЛОГИИ ПАО",
  ];

  // Назначения платежей
  const purposes = [
    "Оплата по договору оказания услуг",
    "Абонентская плата за ПО",
    "Техническая поддержка",
    "Лицензионные отчисления",
    "Обновление программного обеспечения",
    "Консультационные услуги",
    "Обучение персонала",
    "Хостинг и обслуживание",
    "Разработка дополнительных модулей",
    "Интеграция с внешними системами",
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const client = faker.helpers.arrayElement(clients);

    return {
      id: String(index + 1),
      client,
      bankAccount: `4${faker.finance.accountNumber(20)}`, // начинается с 4 и 20 цифр
      // Опциональные дополнительные поля
      amount: faker.number.int({ min: 10000, max: 500000 }),
      currency: "RUB",
      transactionDate: faker.date
        .recent({ days: 30 })
        .toLocaleDateString("ru-RU"),
      purpose: faker.helpers.arrayElement(purposes),
    };
  });
};
