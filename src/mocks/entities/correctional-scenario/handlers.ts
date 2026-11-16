import { correctionalScenarioDb } from "./factory";
import {
  IAccountInfo,
  ICorrectionalScenarioFilter,
  TCorrectionRequestStatus,
} from "@entities/correctional-scenario/model/types";
import { apiPath, badRequest, fakeUuid, notFound, readJson } from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

const CREATED_ATTEMPTS = 2;
const requests = new Map<string, number>();

const statusOf = (attempt: number): TCorrectionRequestStatus =>
  attempt <= CREATED_ATTEMPTS ? "CREATED" : "COMPLETED";

export const handlers = [
  http.post(apiPath("/operations/accounts"), async ({ request }) => {
    await delay();
    const body = await readJson<{ filters?: ICorrectionalScenarioFilter }>(
      request,
    );
    const accountCode = body?.filters?.accountCode?.trim();

    if (!accountCode) return badRequest("Номер счёта ССК обязателен");

    const [found] = correctionalScenarioDb.where(
      (item) => item.accountCode === accountCode,
    );

    return HttpResponse.json(
      found ?? correctionalScenarioDb.create({ accountCode }),
    );
  }),

  http.patch(apiPath("/operations/accounts"), async ({ request }) => {
    await delay();
    const body = await readJson<{ fields?: IAccountInfo }>(request);
    const fields = body?.fields;

    if (!fields?.accountCode) return badRequest("Номер счёта ССК обязателен");

    const current = correctionalScenarioDb.find(fields.accountCode);
    if (!current) return notFound();

    correctionalScenarioDb.update(fields.accountCode, {
      iterimAccountId: fields.iterimAccountId,
      iterimAccountCode: fields.iterimAccountCode,
      accrueAccountId: fields.accrueAccountId,
      accrueAccountCode: fields.accrueAccountCode,
      updatedAt: new Date().toISOString() as IsoDateTime,
    });

    const correctionRequestId = fakeUuid();
    requests.set(correctionRequestId, 0);

    return HttpResponse.json({ correctionRequestId });
  }),

  http.get(apiPath("/operations/:id/status"), async ({ params }) => {
    await delay();
    const id = String(params.id);
    const attempt = requests.get(id);

    if (attempt === undefined) return notFound();

    const next = attempt + 1;
    requests.set(id, next);

    return HttpResponse.json({
      correctionRequestStatus: statusOf(next),
    });
  }),
];
