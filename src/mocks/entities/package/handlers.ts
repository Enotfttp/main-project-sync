import { packageDb } from "./factory";
import { optionDb } from "@mocks/entities/option/factory";
import {
  apiPath,
  filterItems,
  notFound,
  paginate,
  readListRequest,
} from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(apiPath("/packages"), async ({ request }) => {
    await delay();
    const { filters, page } = await readListRequest(request);

    return HttpResponse.json(
      paginate(filterItems(packageDb.all(), filters), page),
    );
  }),

  http.get(apiPath("/packages/:id"), async ({ params }) => {
    await delay();
    const item = packageDb.find(params.id);

    return item ? HttpResponse.json(item) : notFound();
  }),

  http.post(apiPath("/packages/:id/options"), async ({ params, request }) => {
    await delay();
    if (!packageDb.find(params.id)) return notFound();

    const { filters, page } = await readListRequest(request);
    const options = optionDb.where((option) => option.packageId === params.id);

    return HttpResponse.json(paginate(filterItems(options, filters), page));
  }),
];
