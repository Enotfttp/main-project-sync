import { requestDb, toRequestHistoryInfo, toRequestInfo } from "./factory";
import {
  IRequestContent,
  IRequestFilter,
  IRequestHistoryInfo,
  IRequestInfo,
  IRequestInfoDetails,
  TRequestHistoryPaginationResponse,
  TRequestsPaginationResponse,
} from "@entities/request/model";
import {
  apiPath,
  filterItems,
  notFound,
  paginate,
  readListRequest,
  sortItems,
} from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(apiPath("/requests"), async ({ request }) => {
    await delay();
    const { filters, page, sort } = await readListRequest<
      IRequestFilter,
      IRequestInfo
    >(request);
    const items = filterItems(requestDb.all(), filters).map(toRequestInfo);

    return HttpResponse.json<TRequestsPaginationResponse>(
      paginate(sortItems(items, sort), page),
    );
  }),

  http.get(apiPath("/requests/:id"), async ({ params }) => {
    await delay();
    const item = requestDb.find(params.id);
    if (!item) return notFound();

    return HttpResponse.json<IRequestInfoDetails>({
      ...item.details,
    });
  }),

  http.get(apiPath("/requests/:id/content"), async ({ params }) => {
    await delay();
    const item = requestDb.find(params.id);
    if (!item) return notFound();

    return HttpResponse.json<IRequestContent>({ content: item.content });
  }),

  http.get(apiPath("/requests/:id/history"), async ({ request, params }) => {
    await delay();
    const { filters, page, sort } = await readListRequest<
      IRequestFilter,
      IRequestHistoryInfo
    >(request);

    const items = filterItems(requestDb.all(), filters).map(
      toRequestHistoryInfo,
    );

    return HttpResponse.json<TRequestHistoryPaginationResponse>(
      paginate(sortItems(items, sort), page),
    );
  }),
];
