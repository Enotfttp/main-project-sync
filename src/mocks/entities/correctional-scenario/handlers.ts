import { correctionalScenarioDb, createCorrectionalScenario } from "./factory";
import {
  IAccountInfo,
  ICorrectionalScenarioFilter,
} from "@entities/correctional-scenario/model/types";
import { apiPath, badRequest, noContent, notFound, readJson } from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

const filled = (next: string, previous: string) => next.trim() || previous;

const nextAccountInfo = (
  current: IAccountInfo,
  fields: IAccountInfo,
): IAccountInfo => ({
  accountCode: current.accountCode,
  iterimAccountId: "",
  iterimAccountCode: "",
  accrueAccountId: "",
  accrueAccountCode: "",
  iterimAccountIdOld: filled(
    fields.iterimAccountId,
    current.iterimAccountIdOld,
  ),
  iterimAccountCodeOld: filled(
    fields.iterimAccountCode,
    current.iterimAccountCodeOld,
  ),
  accrueAccountIdOld: filled(
    fields.accrueAccountId,
    current.accrueAccountIdOld,
  ),
  accrueAccountCodeOld: filled(
    fields.accrueAccountCode,
    current.accrueAccountCodeOld,
  ),
});

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
      found ??
        correctionalScenarioDb.create(
          createCorrectionalScenario({ accountCode }),
        ),
    );
  }),

  http.patch(
    apiPath("/operations/accounts/:id"),
    async ({ params, request }) => {
      await delay();
      const body = await readJson<{ fields?: IAccountInfo }>(request);
      if (!body?.fields) return badRequest("Поле fields обязательно");

      const current = correctionalScenarioDb.find(params.id);
      if (!current) return notFound();

      const updated = correctionalScenarioDb.update(params.id, {
        updatedAt: new Date().toISOString() as IsoDate,
        accountInfo: nextAccountInfo(current.accountInfo, body.fields),
      });

      return updated ? noContent() : notFound();
    },
  ),
];
