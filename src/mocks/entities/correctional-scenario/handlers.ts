import { correctionalScenarioDb } from "./factory";
import {
  IAccountInfo,
  ICorrectionalScenarioFilter,
} from "@entities/correctional-scenario/model/types";
import { apiPath, badRequest, noContent, notFound, readJson } from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(apiPath("/operations/accounts"), async ({ request }) => {
    await delay();
    const body = await readJson<{ filters?: ICorrectionalScenarioFilter }>(
      request,
    );
    const filters = body?.filters;

    const found = correctionalScenarioDb
      .all()
      .find(
        (item) =>
          (!filters?.packageSubscriptionId ||
            item.packageSubscriptionId === filters.packageSubscriptionId) &&
          (!filters?.accountCode || item.accountCode === filters.accountCode),
      );

    return HttpResponse.json(
      found ?? correctionalScenarioDb.create({ ...filters }),
    );
  }),

  http.patch(
    apiPath("/operations/accounts/:id"),
    async ({ params, request }) => {
      await delay();
      const body = await readJson<{ fields?: IAccountInfo }>(request);
      if (!body?.fields) return badRequest("Поле fields обязательно");

      const updated = correctionalScenarioDb.update(params.id, {
        accountInfo: body.fields,
      });

      return updated ? noContent() : notFound();
    },
  ),
];
