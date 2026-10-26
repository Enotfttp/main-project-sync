import { scheduleDb, toScheduleInfo } from "./factory";
import {
  IScheduleDetails,
  IScheduleFilter,
  ISchedulePeriods,
  RequestStatus,
  TSchedulesPaginationResponse,
} from "@entities/schedule/model";
import {
  apiPath,
  filterItems,
  notFound,
  paginate,
  readListRequest,
} from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(apiPath("/schedules"), async ({ request }) => {
    await delay();
    const { filters, page } = await readListRequest<IScheduleFilter>(request);
    const items = filterItems(scheduleDb.all(), filters).map(toScheduleInfo);
    const { content, page: pageInfo } = paginate(items, page);

    return HttpResponse.json<TSchedulesPaginationResponse>({
      content: content,
      page: pageInfo,
    });
  }),

  http.get(apiPath("/schedules/:id"), async ({ params }) => {
    await delay();
    const schedule = scheduleDb.find(params.id);
    if (!schedule) return notFound();

    return HttpResponse.json<IScheduleDetails>({
      scheduleInfo: schedule.details,
    });
  }),

  http.get(apiPath("/schedules/:id/periods"), async ({ params }) => {
    await delay();
    const schedule = scheduleDb.find(params.id);
    if (!schedule) return notFound();

    const hasError = schedule.periods.some(
      (period) => period.requestStatus === RequestStatus.ERROR,
    );

    return HttpResponse.json<ISchedulePeriods>({
      periodsInfo: schedule.periods,
      errorInfo: hasError
        ? { errorCode: "E-500", errorMessage: "Ошибка обработки периода" }
        : { errorCode: "", errorMessage: "" },
    });
  }),
];
