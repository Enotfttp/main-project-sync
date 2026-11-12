import { optionDb, toOptionInfo } from "./factory";
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
  http.post(apiPath("/options"), async ({ request }) => {
    await delay();
    const { filters, page, sort } = await readListRequest(request);

    const items = filterItems(optionDb.all(), { filters: filters }).map(
      toOptionInfo,
    );

    return HttpResponse.json(paginate(sortItems(items, sort), page));
  }),

  http.get(apiPath("/options/:id"), async ({ params }) => {
    await delay();
    const item = optionDb.find(params.id);

    return item ? HttpResponse.json(item) : notFound();
  }),
];
