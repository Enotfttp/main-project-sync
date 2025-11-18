import { eventsHandlers } from "./EventsHandlers";
import { periodsHandlers } from "./PeriodsHandlers";
import { RKOHandlers } from "./RKOHandlers";
import { serviceConnectsHandlers } from "./ServiceConnetcsHandlers";
import { adminHandlers } from "@mocks/msw/hadlers/AdminHandler";
import { authHandlers } from "@mocks/msw/hadlers/AuthHandlers";
import { HttpHandler } from "msw";

export const handlers: HttpHandler[] = [
  ...RKOHandlers,
  ...serviceConnectsHandlers,
  ...eventsHandlers,
  ...periodsHandlers,
  ...authHandlers,
  ...adminHandlers,
];
