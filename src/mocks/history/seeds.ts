import { generateMockHistories } from "./utils";
import { IRequestHistory } from "@entities/history/types";

export function historySeeds(server) {
  const mockedHistories: IRequestHistory[] = generateMockHistories();

  mockedHistories.forEach((auth) => {
    server.create("history", auth);
  });
}
