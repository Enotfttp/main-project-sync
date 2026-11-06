import { scheduleDb, toScheduleInfo } from "./factory";
import {
  IScheduleFilter,
  IScheduleInfo,
  IScheduleInfoDetails,
  ISchedulePeriods,
  TSchedulesPaginationResponse,
} from "@entities/schedule/model";
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

  http.get(apiPath("/schedules/:id/periods"), async ({ params }) => {
    await delay();
    const schedule = scheduleDb.find(params.id);
    if (!schedule) return notFound();

    const hasError = schedule.periods.some(
      (period) => period.requestStatus === "ERROR",
    );

    return HttpResponse.json<ISchedulePeriods>({
      periodsInfo: schedule.periods,
      errorInfo: hasError
        ? { errorCode: "E-500", errorMessage: "Ошибка обработки периода" }
        : { errorCode: "", errorMessage: "" },
    });
  }),
];
