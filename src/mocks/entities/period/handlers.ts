import { periodDb } from "./factory";
import { apiPath, notFound } from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get(apiPath("/periods/:id"), async ({ params }) => {
    await delay();
    const item = periodDb.find(params.id);

    return item ? HttpResponse.json(item) : notFound();
  }),
];
