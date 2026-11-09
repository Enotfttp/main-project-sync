import { packageDb, toPackageInfo } from "./factory";
import {
  IPackageFilter,
  IPackageInfo,
  IPackageInfoDetails,
  TPackagesPaginationResponse,
} from "@entities/package/model";
import { optionDb } from "@mocks/entities/option/factory";
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
  http.post(apiPath("/packages"), async ({ request }) => {
    await delay();
    const { filters, page, sort } = await readListRequest<
      IPackageFilter,
      IPackageInfo
    >(request);
    const items = filterItems(packageDb.all(), filters).map(toPackageInfo);

    return HttpResponse.json<TPackagesPaginationResponse>(
      paginate(sortItems(items, sort), page),
    );
  }),

  http.get(apiPath("/packages/:id"), async ({ params }) => {
    await delay(5000);
    const packageItems = packageDb.find(params.id);
    if (!packageItems) return notFound();

    return HttpResponse.json<IPackageInfoDetails>({
      ...packageItems.details,
    });
  }),

  http.post(apiPath("/packages/:id/options"), async ({ params, request }) => {
    await delay();
    if (!packageDb.find(params.id)) return notFound();

    const { filters, page, sort } = await readListRequest(request);
    const options = optionDb.where(
      (option) => String(option.optionSubscriptionId) === params.id,
    );
    const items = filterItems(options, filters);

    return HttpResponse.json(paginate(sortItems(items, sort), page));
  }),
];
