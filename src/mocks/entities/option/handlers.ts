import { optionDb } from "./factory";
import { apiPath, notFound } from "@mocks/lib";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get(apiPath("/options/:id"), async ({ params }) => {
    await delay();
    const item = optionDb.find(params.id);

    return item ? HttpResponse.json(item) : notFound();
  }),
];
