import {
  EDocStatus,
  EDocType,
  EEventType,
  EOrderStatus,
  EProcessDoc,
  ERequestProcessCode,
  IDocuments,
} from "@entities/documents/types";
import { fakerRU as faker } from "@faker-js/faker";

const DOC_TYPES = Object.keys(EDocType) as Array<keyof typeof EDocType>;

const DOC_STATUSES = Object.keys(EDocStatus) as Array<keyof typeof EDocStatus>;

const ORDER_STATUSES = Object.keys(EOrderStatus) as Array<
  keyof typeof EOrderStatus
>;

const PROCESS_CODES = Object.keys(ERequestProcessCode) as Array<
  keyof typeof ERequestProcessCode
>;

const PROCESS_DOC = Object.keys(EProcessDoc) as Array<keyof typeof EProcessDoc>;

const EVENT_TYPES = Object.keys(EEventType) as Array<keyof typeof EEventType>;

function generateInnIndividual() {
  const region = faker.string.numeric(2); // 2 цифры кода региона
  const office = faker.string.numeric(2); // 2 цифры кода инспекции
  const number = faker.string.numeric(6); // 6 цифр номера
  const checkSum = faker.string.numeric(2); // 2 цифры контрольной суммы
  return `${region}${office}${number}${checkSum}`;
}

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
    let orderStatus: keyof typeof EOrderStatus | null = null;

    if (status !== "CREATED") {
      orderStatus =
        ORDER_STATUSES[Math.floor(ORDER_STATUSES.length * Math.random())];
    }

    const recBankBic = faker.string.numeric(6);
    const recBankCorrAccount = faker.string.numeric(6);
    const recBankName = faker.person.jobArea();
    const mdmCode = faker.string.numeric(6);
    const payerName = faker.person.fullName();

    const payerObj = {
      id: faker.number.int({ min: 0, max: 30 }),
      processingBranchCode: faker.string.numeric(4),
      processingDepartmentCode: faker.string.numeric(4),
      accountCode: faker.string.numeric(4),
      accountId: faker.string.uuid(),
      accountBranchCode: faker.string.numeric(4),
      accountDepartmentCode: faker.string.numeric(4),
      inn: generateInnIndividual(),
      kpp: generateInnIndividual(),
      name: payerName,
      recBankBic,
      recBankCorrAccount,
      recBankName,
      mdmCode,
      created_at: faker.date
        .between({
          from: "2023-01-01",
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
      updated_at: faker.date
        .between({
          from: "2023-01-01",
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
    };

    const bankObj = {
      inn: generateInnIndividual(),
      kpp: generateInnIndividual(),
      payerName: payerName,
      mdmCode: mdmCode,
      bic: recBankBic,
      name: recBankName,
      corrAccount: faker.string.numeric(6),
      branchCode: faker.string.numeric(6),
    };

    const paramObj = {
      iterimAccountCode: faker.string.numeric(6),
      iterimAccountId: faker.string.uuid(),
      pkgQueueCompleteDate: faker.date
        .between({
          from: "2023-01-01",
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
      accrueAccountId: faker.string.uuid(),
      accrueAccountCode: faker.string.numeric(4),
      productInstanceId: faker.string.uuid(),
    };

    const updatedAt = faker.date.soon({ days: 15 }).toLocaleDateString("ru-RU");

    documents.push({
      id: faker.number.int({ min: 1, max: 999999 }),
      parentDocId: faker.string.uuid(),
      orderStatus,
      docType,
      requestProcessCode: faker.helpers.arrayElement(PROCESS_CODES),
      vkus: `VKUS ${i}`,
      payer: payerObj,
      codeTs: `codeTs ${i}`,
      nameTs: `nameTs ${i}`,
      purpose: `purpose ${i}`,
      vkusPattern: `vkusPattern ${i}`,
      amountFullCur: faker.number.int({ min: 100, max: 10000 }),
      amountCur: faker.number.int({ min: 100, max: 10000 }),
      currencyTariff: `currencyTariff ${i}`,
      vatDocumentVatRate: faker.number.int({ min: 100, max: 10000 }),
      vatDocumentAmountNdsCur: faker.number.int({ min: 100, max: 10000 }),
      processDocProcessCode: faker.helpers.arrayElement(PROCESS_DOC),
      bank: bankObj,
      param: paramObj,
      documentDate: faker.date
        .between({
          from: "2023-01-01",
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
      documentLabel: `documentLabel ${i}`,
      priority: i,
      eventType: faker.helpers.arrayElement(EVENT_TYPES),
      processEndDate: faker.date
        .between({
          from: "2023-01-01",
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
      processAccDate: faker.date
        .between({
          from: "2023-01-01",
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
      executionDateTime: faker.date
        .between({
          from: "2023-01-01",
          to: new Date(),
        })
        .toLocaleDateString("ru-RU"),
      inGroupOperation: faker.datatype.boolean(),
      attemptsCount: faker.number.int({ min: 100, max: 10000 }),
      status,
      createdAt: creationDate,
      updatedAt,
    });
  }

  return documents;
}
