import { optionDb, toOptionInfo } from "./factory";
import { IOptionInfo } from "@entities/option/model";
import {
  apiPath,
  notFound,
  paginate,
  readListRequest,
  sortItems,
} from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(apiPath("/options"), async ({ request }) => {
    await delay();
    const { filters, page, sort } = await readListRequest<
      { packageSubscriptionId?: string },
      IOptionInfo
    >(request);
    const packageId = filters?.packageSubscriptionId;
    const owned = optionDb
      .where(
        (option) => String(option.packageSubscriptionId) === String(packageId),
      )
      .map(toOptionInfo);

    return HttpResponse.json(paginate(sortItems(owned, sort), page));
  }),

  http.get(apiPath("/options/:id"), async ({ params }) => {
    await delay();
    const item = optionDb.find(params.id);

    return item ? HttpResponse.json(item) : notFound();
  }),
];
