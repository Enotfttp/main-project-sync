import { handlers } from "./handlers";
import { API_URL } from "./lib";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...handlers);

export const startWorker = () =>
  worker.start({
    onUnhandledRequest(request, print) {
      if (new URL(request.url).pathname.startsWith(API_URL)) {
        print.warning();
      }
    },
  });
