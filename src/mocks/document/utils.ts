import {
  IDocuments,
  TDocStatus,
  TDocType,
  TOrderStatus,
} from "@entities/documents/types";
import { fakerRU as faker } from "@faker-js/faker";

const DOC_TYPES: TDocType[] = [
  "PAYMENT_REQUEST_DOC",
  "MEMORIAL_ORDER_DOC",
  "BANK_ORDER_DOC",
  "NULL_PAYMENT_DOC",
];

const DOC_STATUSES: TDocStatus[] = [
  "CREATED",
  "SENT",
  "DELIVERED",
  "PROCESSED",
  "COMPLETED",
  "ERROR",
];

const ORDER_STATUSES: TOrderStatus[] = [
  "PASSED_VERIFICATION",
  "UNDER_VERIFICATION",
  "DOCUMENT_ERROR",
];

export function createMockDocuments(): IDocuments[] {
  const documents: IDocuments[] = [];

  for (let i = 0; i < 30; i++) {
    const creationDate = faker.date
      .between({
        from: "2023-01-01",
        to: new Date(),
      })
      .toLocaleDateString("ru-RU");

    // Случайный тип и статус
    const docType = DOC_TYPES[Math.floor(Math.random() * DOC_TYPES.length)];
    const status =
      DOC_STATUSES[Math.floor(Math.random() * DOC_STATUSES.length)];
    let orderStatus: TOrderStatus | null = null;

    if (status !== "CREATED") {
      orderStatus =
        ORDER_STATUSES[Math.floor(ORDER_STATUSES.length * Math.random())];
    }

    // Генерация остальных дат
    const processDate = faker.date
      .soon({ days: 30 })
      .toLocaleDateString("ru-RU");
    const executionDate = faker.date
      .soon({ days: 60 })
      .toLocaleDateString("ru-RU");
    const availableAt = faker.date
      .soon({ days: 45 })
      .toLocaleDateString("ru-RU");
    const updatedAt = faker.date.soon({ days: 15 }).toLocaleDateString("ru-RU");

    documents.push({
      id: faker.number.int({ min: 1, max: 999999 }),
      incomingMessageId: faker.number.int({ min: 1000, max: 9999 }),
      requestId: faker.number.int({ min: 10000, max: 99999 }),
      processDate,
      orderStatus,
      executionDate: executionDate,
      docType,
      status,
      availableAt,
      createdAt: creationDate,
      updatedAt,
    });
  }

  return documents;
}
