import { documentDb, TDocumentMock, toDocumentInfo } from "./factory";
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
  /** `/documents?periodId=` | `?packageId=` | `?optionId=` */
  http.post(apiPath("/documents"), async ({ request }) => {
    await delay();
    const searchParams = new URL(request.url).searchParams;
    const ownerKey = ownerKeys.find((key) => searchParams.has(key));
    if (!ownerKey) {
      return badRequest(
        `Ожидается один из параметров: ${ownerKeys.join(", ")}`,
      );
    }

    const ownerId = searchParams.get(ownerKey);
    const { filters, page, sort } = await readListRequest(request);
    const documents = documentDb
      .where((document: TDocumentMock) => document[ownerKey] === ownerId)
      .map(toDocumentInfo);
    const items = filterItems(documents, filters);

    return HttpResponse.json(paginate(sortItems(items, sort), page));
  }),

  http.get(apiPath("/documents/:id"), async ({ params }) => {
    await delay();
    const item = documentDb.find(params.id);

    return item ? HttpResponse.json(toDocumentInfo(item)) : notFound();
  }),
];
