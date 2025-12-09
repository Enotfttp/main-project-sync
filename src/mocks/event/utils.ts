import { IEventsList } from "@entities/events";
import { fakerRU as faker } from "@faker-js/faker";

export const generateMockEvents = (): IEventsList[] => {
  const serviceIds = ["1", "2", "3", "4", "5"];
  const eventTypes = [
    "Обновление системы",
    "Патч безопасности",
    "Миграция данных",
    "Технические работы",
    "Резервное копирование",
    "Восстановление системы",
    "Оптимизация производительности",
    "Изменение конфигурации",
    "Развертывание новой версии",
    "Интеграция с внешним сервисом",
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const eventDate = faker.date.future({ years: 0.5 }); // ближайшие 6 месяцев
    const execDate = faker.date.future({ refDate: eventDate, years: 0.2 }); // через 0-2 месяца после события
    const rollbackDate = faker.date.future({ refDate: execDate, years: 0.1 }); // через 0-1 месяц после выполнения

    return {
      id: String(index + 1),
      serviceId: faker.helpers.arrayElement(serviceIds),
      eventDate: faker.date.recent({ days: 30 }).toLocaleDateString("ru-RU"), // события за последний месяц
      eventType: faker.helpers.arrayElement(eventTypes),
      execDate: execDate.toLocaleDateString("ru-RU"),
      rollbackDate: rollbackDate.toLocaleDateString("ru-RU"),
    };
  });
};
