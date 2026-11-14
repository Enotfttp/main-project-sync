import { documentDb, TDocumentMock, toDocumentInfo } from "./factory";
import { IDocumentInfoDetails } from "@entities/document/model";
import {
  apiPath,
  badRequest,
  filterItems,
  notFound,
  paginate,
  readListRequest,
  sortItems,
} from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

const ownerKeys = [
  "periodId",
  "packageSubscriptionId",
  "optionSubscriptionId",
] as const;

export const handlers = [
  http.post(apiPath("/documents"), async ({ request }) => {
    await delay();
    const searchParams = new URL(request.url).searchParams;
    const mergedDocumentId = searchParams.get("mergedDocumentId");

    if (mergedDocumentId) {
      const { filters, page, sort } = await readListRequest(request);
      const documents = documentDb
        .where(
          (document) => String(document.mergedDocumentId) === mergedDocumentId,
        )
        .map(toDocumentInfo);
      const items = filterItems(documents, filters);

      return HttpResponse.json(paginate(sortItems(items, sort), page));
    }

    const ownerKey = ownerKeys.find((key) => searchParams.has(key));
    if (!ownerKey) {
      return badRequest(
        `Ожидается один из параметров: ${ownerKeys.join(", ")}`,
      );
    }

    const ownerId = searchParams.get(ownerKey);
    const { filters, page, sort } = await readListRequest(request);
    const documents = documentDb
      .where(
        (document: TDocumentMock) =>
          String(document[ownerKey]) === String(ownerId),
      )
      .map(toDocumentInfo);
    const items = filterItems(documents, filters);

    return HttpResponse.json(paginate(sortItems(items, sort), page));
  }),

  http.get(apiPath("/documents/:documentId"), async ({ params }) => {
    await delay();
    const document = documentDb.find(params.documentId);
    if (!document) return notFound();

    return HttpResponse.json<IDocumentInfoDetails>({
      ...document.details,
    });
  }),
];
