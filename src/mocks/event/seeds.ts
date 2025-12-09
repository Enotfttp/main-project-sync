import { generateMockEvents } from "./utils";
import { IEventsList } from "@entities/events";

export function eventSeeds(server) {
  const mockedEventsList: IEventsList[] = generateMockEvents();

  mockedEventsList.forEach((auth) => {
    server.create("event", auth);
  });
}
