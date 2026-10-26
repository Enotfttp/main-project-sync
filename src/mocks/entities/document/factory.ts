import { optionDb } from "@mocks/entities/option/factory";
import { periodDb } from "@mocks/entities/period/factory";
import {
  createCollection,
  fakeFutureIsoDate,
  fakeIsoDate,
  fakeUuid,
  faker,
} from "@mocks/lib";

type TDocumentStatus = "CREATED" | "SIGNED" | "SENT" | "REJECTED";

/** Контракт бэкенда ещё не описан в `@entities/document/model/types`. */
export interface IDocumentMock {
  documentId: UUID;
  packageId: UUID;
  optionId?: UUID;
  periodId?: UUID;
  number: string;
  name: string;
  status: TDocumentStatus;
  createdAt: IsoDate;
  updatedAt: IsoDate;
  history: IDocumentHistoryItemMock[];
}

export interface IDocumentHistoryItemMock {
  status: TDocumentStatus;
  comment: string;
  createdAt: IsoDate;
}

const documentNames = [
  "Акт выполненных работ",
  "Счёт-фактура",
  "Заявление на подключение",
  "Уведомление об изменении тарифа",
  "Дополнительное соглашение",
];

const documentStatuses: TDocumentStatus[] = [
  "CREATED",
  "SIGNED",
  "SENT",
  "REJECTED",
];

export const createDocument = (): IDocumentMock => {
  const option = faker.helpers.arrayElement(optionDb.all());
  const createdAt = fakeIsoDate();
  const history = faker.helpers
    .multiple(
      () => ({
        status: faker.helpers.arrayElement(documentStatuses),
        comment: faker.lorem.sentence(),
        createdAt: fakeFutureIsoDate(createdAt),
      }),
      { count: { min: 1, max: 5 } },
    )
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  return {
    documentId: fakeUuid(),
    packageId: option.packageId,
    optionId: faker.datatype.boolean() ? option.optionId : undefined,
    periodId: faker.datatype.boolean()
      ? faker.helpers.arrayElement(periodDb.all()).periodId
      : undefined,
    number: `№ ${faker.string.numeric(6)}`,
    name: faker.helpers.arrayElement(documentNames),
    status: history[history.length - 1].status,
    createdAt,
    updatedAt: history[history.length - 1].createdAt,
    history,
  };
};

export const documentDb = createCollection("documentId", createDocument, 200);

export const toDocumentInfo = ({
  history: _history,
  ...document
}: IDocumentMock) => document;
