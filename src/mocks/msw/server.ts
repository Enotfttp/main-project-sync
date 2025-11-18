import { handlers } from "./hadlers/index";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);
