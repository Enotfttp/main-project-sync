import { IDocuments } from "@entities/documents/types";
import { fakerRU as faker } from "@faker-js/faker";

export type DocumentStatus = "CREATED" | "PROCESSED";

export const generateMockDocuments = (options?: {
  // ID для связей с другими сущностями
  incomingMessageIds?: number[];
  requestIds?: number[];
  // Распределение статусов
  statusDistribution?: Partial<Record<DocumentStatus, number>>;
  // Типы документов (можно расширить)
  documentTypes?: string[];
}): IDocuments[] => {
  // Типы документов с описаниями
  const defaultDocumentTypes = [
    "Платёжное поручение",
    "Счёт на оплату",
    "Акт выполненных работ",
    "Счёт-фактура",
    "Договор",
    "Дополнительное соглашение",
    "Уведомление",
    "Акт сверки",
    "Требование",
    "Заявка",
    "Реестр платежей",
    "Авансовый отчёт",
    "Банковская выписка",
    "Платёжное требование",
    "Инкассовое поручение",
  ];

  // Коды типов документов для поиска
  const documentTypeCodes = [
    "PP", // Платёжное поручение
    "INV", // Счёт
    "ACT", // Акт
    "SF", // Счёт-фактура
    "DOG", // Договор
    "DS", // Допсоглашение
    "NOT", // Уведомление
    "ACTR", // Акт сверки
    "TREQ", // Требование
    "ZAY", // Заявка
    "REG", // Реестр
    "AVO", // Авансовый отчёт
    "BANK", // Выписка
    "PT", // Платёжное требование
    "INC", // Инкассо
  ];

  // Статусы документов с реалистичным распределением
  const getRandomStatus = (): DocumentStatus => {
    const rand = Math.random();
    // 70% обработанных, 30% созданных
    return rand < 0.7 ? "PROCESSED" : "CREATED";
  };

  // Типы документов в зависимости от статуса
  const getDocumentTypeForStatus = (status: DocumentStatus): string => {
    const types = options?.documentTypes || defaultDocumentTypes;

    if (status === "PROCESSED") {
      // Для обработанных документов чаще финансовые типы
      const processedTypes = [
        "Платёжное поручение",
        "Счёт на оплату",
        "Акт выполненных работ",
        "Счёт-фактура",
        "Банковская выписка",
        "Реестр платежей",
      ];
      return faker.helpers.arrayElement(
        types.filter((type) => processedTypes.includes(type)),
      );
    } else {
      // Для созданных - все типы
      return faker.helpers.arrayElement(types);
    }
  };

  // Генерация дат с логической связью
  const generateDates = (status: DocumentStatus) => {
    const creationDate = faker.date.past({ years: 1 });

    // Дата обработки - только для PROCESSED документов
    let processDate: string;
    if (status === "PROCESSED") {
      processDate = faker.date
        .between({
          from: creationDate,
          to: new Date(),
        })
        .toISOString();
    } else {
      // Для CREATED - дата обработки может быть в будущем или null
      processDate = faker.datatype.boolean()
        ? faker.date.future({ years: 0.1 }).toISOString()
        : faker.date.recent({ days: 1 }).toISOString();
    }

    // Дата исполнения (может быть позже даты обработки)
    let executionDate: string;
    if (status === "PROCESSED") {
      executionDate = faker.date
        .between({
          from: processDate,
          to: faker.date.future({ refDate: processDate, years: 0.2 }),
        })
        .toISOString();
    } else {
      // Для CREATED - либо будущая, либо null
      executionDate = faker.datatype.boolean({ probability: 0.4 })
        ? faker.date.future({ years: 0.3 }).toISOString()
        : faker.date.recent({ days: 2 }).toISOString();
    }

    return {
      creation_date: creationDate.toISOString(),
      process_date: processDate,
      execution_date: executionDate,
    };
  };

  // Используем переданные ID или генерируем случайные
  const incomingMessageIds =
    options?.incomingMessageIds ||
    Array.from({ length: 100 }, (_, i) => 1000 + i * 10);

  const requestIds =
    options?.requestIds || Array.from({ length: 200 }, (_, i) => 5000 + i);

  return Array.from({ length: 30 }, (_, index) => {
    const status = getRandomStatus();
    const dates = generateDates(status);
    const docType = getDocumentTypeForStatus(status);

    // Получаем код типа документа по названию
    const getTypeCode = (typeName: string): string => {
      const index = defaultDocumentTypes.indexOf(typeName);
      return index >= 0 && index < documentTypeCodes.length
        ? documentTypeCodes[index]
        : `DOC-${faker.string.alphanumeric(3).toUpperCase()}`;
    };

    return {
      id: 20000 + index, // начинаем с 20000
      incomingMessageId: faker.helpers.arrayElement(incomingMessageIds),
      requestId: faker.helpers.arrayElement(requestIds),
      processDate: dates.process_date,
      creation_date: dates.creation_date,
      execution_date: dates.execution_date,
      doc_type: `${getTypeCode(docType)} - ${docType}`,
      status,
    };
  });
};
