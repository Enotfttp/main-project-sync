import { requestDb, toRequestInfo } from "./factory";
import {
  IRequestContent,
  IRequestDetails,
  IRequestFilter,
  IRequestHistory,
  TRequestsPaginationResponse,
} from "@entities/request/model";
import {
  apiPath,
  filterItems,
  notFound,
  paginate,
  readListRequest,
} from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(apiPath("/requests"), async ({ request }) => {
    await delay();
    const { filters, page } = await readListRequest<IRequestFilter>(request);
    const items = filterItems(requestDb.all(), filters).map(toRequestInfo);
    const { data, page: pageInfo } = paginate(items, page);

    return HttpResponse.json<TRequestsPaginationResponse>({
      data: [{ requestsInfo: data }],
      page: pageInfo,
    });
  }),

  http.get(apiPath("/requests/:id"), async ({ params }) => {
    await delay();
    const item = requestDb.find(params.id);
    if (!item) return notFound();

    return HttpResponse.json<IRequestDetails>({
      requestInfo: item.details,
      errorInfo: item.errorInfo,
    });
  }),

  http.get(apiPath("/requests/:id/content"), async ({ params }) => {
    await delay();
    const item = requestDb.find(params.id);
    if (!item) return notFound();

    return HttpResponse.json<IRequestContent>({ content: item.content });
  }),

  http.get(apiPath("/requests/:id/history"), async ({ params }) => {
    await delay();
    const item = requestDb.find(params.id);
    if (!item) return notFound();

    return HttpResponse.json<IRequestHistory>({
      requestHistory: item.history,
      errorInfo: item.errorInfo,
    });
  }),
];
