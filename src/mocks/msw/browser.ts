import { handlers } from "./hadlers/index";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...handlers);
