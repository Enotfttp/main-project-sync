import { documentDb } from "../document/factory";
import { requestDb } from "../request/factory";
import { scheduleDb } from "../schedule/factory";
import { IReportInfo } from "@entities/report/model";
import { createCollection, fakeAmount, faker } from "@mocks/lib";

export const createReportItem = (): IReportInfo => {
  const sch = faker.helpers.arrayElement(scheduleDb.all());
  const req = faker.helpers.arrayElement(requestDb.all());
  const doc = faker.helpers.arrayElement(documentDb.all());

  const notRequiredFields = faker.datatype.boolean()
    ? {
        documentId: doc.documentId,
        documentDate: doc.documentDate,
        documentType: doc.documentType,
        documentProcessCode: doc.documentProcessCode,
        documentStatus: doc.documentStatus,
        orderStatus: doc.orderStatus,
        amountFullCur: fakeAmount(),
        documentMerged: doc.documentMerged,
        purpose: doc.purpose,
      }
    : {};

  return {
    requestId: req.requestId,
    scheduleSourceGuid: sch.scheduleSourceGuid,
    ...notRequiredFields,
  };
};

export const reportDb = createCollection("documentId", createReportItem, 50);
