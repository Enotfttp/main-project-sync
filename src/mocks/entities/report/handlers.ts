import { reportDb } from "./factory";
import {
  IReportInfo,
  TReportsPaginationResponse,
} from "@entities/report/model";
import {
  apiPath,
  filterItems,
  paginate,
  readListRequest,
  sortItems,
} from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  /** response */
  http.get(
    apiPath("/reports/not-incomed-months-comissions"),
    async ({ request }) => {
      await delay();
      const { filters, page, sort } = await readListRequest<
        object,
        IReportInfo
      >(request);
      const items = filterItems(reportDb.all(), filters);

      return HttpResponse.json<TReportsPaginationResponse>(
        paginate(sortItems(items, sort), page),
      );
    },
  ),

  /** response */
  http.get(
    apiPath("/reports/not-incomed-advanced-comissions"),
    async ({ request }) => {
      await delay();
      const { filters, page, sort } = await readListRequest<
        object,
        IReportInfo
      >(request);
      const items = filterItems(reportDb.all(), filters);

      return HttpResponse.json<TReportsPaginationResponse>(
        paginate(sortItems(items, sort), page),
      );
    },
  ),

  /** response */
  http.get(
    apiPath("/reports/not-incomed-package-change-comissions"),
    async ({ request }) => {
      await delay();
      const { filters, page, sort } = await readListRequest<
        object,
        IReportInfo
      >(request);
      const items = filterItems(reportDb.all(), filters);

      return HttpResponse.json<TReportsPaginationResponse>(
        paginate(sortItems(items, sort), page),
      );
    },
  ),

  /** response */
  http.get(apiPath("/reports/error-comc-requests"), async ({ request }) => {
    await delay();
    const { filters, page, sort } = await readListRequest<object, IReportInfo>(
      request,
    );
    const items = filterItems(reportDb.all(), filters);

    return HttpResponse.json<TReportsPaginationResponse>(
      paginate(sortItems(items, sort), page),
    );
  }),

  /** response */
  http.get(apiPath("/reports/card-index-control"), async ({ request }) => {
    await delay();
    const { filters, page, sort } = await readListRequest<object, IReportInfo>(
      request,
    );
    const items = filterItems(reportDb.all(), filters);

    return HttpResponse.json<TReportsPaginationResponse>(
      paginate(sortItems(items, sort), page),
    );
  }),

  /** response */
  http.get(
    apiPath("/reports/validation-error-documents"),
    async ({ request }) => {
      await delay();
      const { filters, page, sort } = await readListRequest<
        object,
        IReportInfo
      >(request);
      const items = filterItems(reportDb.all(), filters);

      return HttpResponse.json<TReportsPaginationResponse>(
        paginate(sortItems(items, sort), page),
      );
    },
  ),

  /** response */
  http.get(
    apiPath("/reports/created-or-accepted-documents"),
    async ({ request }) => {
      await delay();
      const { filters, page, sort } = await readListRequest<
        object,
        IReportInfo
      >(request);
      const items = filterItems(reportDb.all(), filters);

      return HttpResponse.json<TReportsPaginationResponse>(
        paginate(sortItems(items, sort), page),
      );
    },
  ),
];
