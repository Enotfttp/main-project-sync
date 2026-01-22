import { generateStructuredRequestTypes } from "./utils";
import { IRequestType } from "@entities/requestTypes/types";

export function requestTypeSeeds(server) {
  const mockedRequestTypes: IRequestType[] = generateStructuredRequestTypes();
  mockedRequestTypes.forEach((auth) => {
    server.create("requestType", auth);
  });
}
