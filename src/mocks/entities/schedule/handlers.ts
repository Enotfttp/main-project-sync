import { scheduleDb, toScheduleInfo } from "./factory";
import {
  IPeriodInfo,
  IScheduleFilter,
  IScheduleInfo,
  IScheduleInfoDetails,
  TPeriodsPaginationResponse,
  TSchedulesPaginationResponse,
} from "@entities/schedule/model";
import { periodDb, toPeriodInfo } from "@mocks/entities/period/factory";
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
  http.post(apiPath("/schedules"), async ({ request }) => {
    await delay();
    const { filters, page, sort } = await readListRequest<
      IScheduleFilter,
      IScheduleInfo
    >(request);
    const items = filterItems(scheduleDb.all(), filters).map(toScheduleInfo);

    return HttpResponse.json<TSchedulesPaginationResponse>(
      paginate(sortItems(items, sort), page),
    );
  }),

  http.get(apiPath("/schedules/:id"), async ({ params }) => {
    await delay();
    const schedule = scheduleDb.find(params.id);
    if (!schedule) return notFound();

    return HttpResponse.json<IScheduleInfoDetails>({
      ...schedule.details,
    });
  }),

  http.get(apiPath("/schedules/:id/periods"), async ({ request }) => {
    await delay();

    const { filters, page, sort } = await readListRequest<object, IPeriodInfo>(
      request,
    );
    const items = filterItems(periodDb.all(), filters).map(toPeriodInfo);

    return HttpResponse.json<TPeriodsPaginationResponse>(
      paginate(sortItems(items, sort), page),
    );
  }),
];
