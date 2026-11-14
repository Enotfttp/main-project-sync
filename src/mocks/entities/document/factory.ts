import { optionDb } from "../option/factory";
import { packageDb } from "../package/factory";
import { periodDb } from "../period/factory";
import {
  DocumentProcessCode,
  DocumentStatus,
  DocumentType,
  IDocumentInfo,
  IDocumentInfoDetails,
  OrderStatus,
} from "@entities/document/model";
import {
  createCollection,
  fakeAmount,
  fakeFutureIsoDate,
  fakeInn,
  fakeIsoDate,
  faker,
  fakeUuid,
} from "@mocks/lib";
import { keysOf } from "@shared/lib";

export type TDocumentMock = IDocumentInfo & {
  periodId?: UUID;
  packageSubscriptionId?: number;
  optionSubscriptionId?: number;
  mergedDocumentId?: UUID;
  details: IDocumentInfoDetails;
};

const documentTypes = keysOf(DocumentType);
const documentProcessCodes = keysOf(DocumentProcessCode);
const documentStatuses = keysOf(DocumentStatus);
const orderStatuses = keysOf(OrderStatus);
const accountCodes = ["RUB", "EUR", "USD"];
const rateTypes = ["CB", "СЗ", "ЮВ", "ЮЗ"];

export const createDocument = (): TDocumentMock => {
  const prd = faker.helpers.arrayElement(periodDb.all());
  const pck = faker.helpers.arrayElement(packageDb.all());
  const opt = faker.helpers.arrayElement(optionDb.all());
  const documentId = fakeUuid();
  const documentDate = fakeIsoDate();
  const documentType = faker.helpers.arrayElement(documentTypes);
  const documentProcessCode = faker.helpers.arrayElement(documentProcessCodes);
  const documentStatus = faker.helpers.arrayElement(documentStatuses);
  const orderStatus = faker.helpers.arrayElement(orderStatuses);
  const documentMerged = faker.datatype.boolean();
  const purpose = faker.lorem.text();

  const generateDetail = (): IDocumentInfoDetails => {
    const accountCode = faker.helpers.arrayElement(accountCodes);
    const rateType = faker.helpers.arrayElement(rateTypes);
    const createdAt = fakeIsoDate();
    const updatedAt = fakeFutureIsoDate(createdAt);

    return {
      documentId,
      documentLabel: faker.string.numeric(6),
      documentDate,
      documentType,
      documentProcessCode,
      vkus: `${faker.number.int(3)}.${faker.number.int(4)}.${faker.number.int(3)}`,
      documentStatus,
      orderStatus,
      documentMerged,
      processingBranchCode: faker.string.numeric(2),
      processingDepartmentCode: faker.string.numeric(4),
      payerInfo: {
        inn: fakeInn(),
        kpp: faker.string.numeric(9),
        name: faker.company.name(),
        mdmCode: faker.string.numeric(12),
        accountId: fakeUuid(),
        accountCode: faker.string.numeric(12),
        currencyAccount: accountCode,
        accountBranchCode: faker.string.numeric(2),
        accountDepartmentCode: `DEP${faker.string.numeric(3)}`,
      },
      payerBankInfo: {
        bic: faker.string.numeric(9),
        name: faker.company.name(),
        corrAccount: faker.string.numeric(21),
      },
      beneficiaryInfo: {
        inn: fakeInn(),
        kpp: faker.string.numeric(9),
        name: faker.company.name(),
        mdmCode: faker.string.numeric(12),
        accountId: fakeUuid(),
        accountCode: faker.string.numeric(12),
        currencyAccount: faker.helpers.arrayElement(accountCodes),
        accountBranchCode: faker.string.numeric(2),
        accountDepartmentCode: `DEP${faker.string.numeric(3)}`,
      },
      beneficiaryBankInfo: {
        bic: faker.string.numeric(9),
        name: faker.company.name(),
        corrAccount: faker.string.numeric(21),
      },
      currencyOperationInfo: {
        amountFullCur: String(fakeAmount()),
        currency: accountCode,
        rateType: rateType,
        rate: String(fakeAmount()),
        sumComRub: String(fakeAmount()),
        sumNDSRub: String(fakeAmount()),
        tbi: `${faker.number.int(4)}.${faker.number.int(4)}`,
      },
      utilityInfo: {
        amountFullCur: String(fakeAmount()),
        amountCur: String(fakeAmount()),
        currencyAccount: accountCode,
        nameTs: faker.commerce.productName(),
        purpose,
        codeTs: `${faker.number.int(2)}.${faker.number.int(1)}.${faker.number.int(1)}`,
        vkusPattern: faker.string.numeric(3),
      },
      vatDocument: {
        vatRate: String(fakeAmount()),
        amountNdsCur: String(fakeAmount()),
        purposeNds: purpose,
      },
      additionalCodeInfo: {
        accrueAccountId: `${faker.number.int(1)}.${faker.number.int(2)}`,
        accrueAccountCode: faker.string.numeric(7),
        productInstanceId: fakeUuid(),
        parentDocId: fakeUuid(),
        pkgQueueCompleteDate: fakeIsoDate(),
      },
      technicalInfo: {
        createdAt,
        updatedAt,
      },
    };
  };

  return {
    periodId: prd.periodId,
    packageSubscriptionId: pck.packageSubscriptionId,
    optionSubscriptionId: opt.optionSubscriptionId,
    documentId,
    documentDate,
    documentType,
    documentProcessCode,
    documentStatus,
    orderStatus,
    amountFullCur: fakeAmount(),
    documentMerged,
    purpose,
    details: { ...generateDetail() },
  };
};

export const documentDb = createCollection("documentId", createDocument, 1200);

const linkMergedDocuments = () => {
  const documents = documentDb.all();
  const mergedIds = documents
    .filter((document) => document.documentMerged)
    .map((document) => document.documentId);

  if (!mergedIds.length) return;

  documents.forEach((document, index) => {
    const mergedDocumentId = mergedIds[index % mergedIds.length];
    if (mergedDocumentId === document.documentId) return;

    documentDb.update(document.documentId, { mergedDocumentId });
  });
};

linkMergedDocuments();

export const toDocumentInfo = ({
  details: _details,
  periodId: _periodId,
  packageSubscriptionId: _packageSubscriptionId,
  optionSubscriptionId: _optionSubscriptionId,
  mergedDocumentId: _mergedDocumentId,
  ...document
}: TDocumentMock) => document;
