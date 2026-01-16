import { generateStructuredPeriods } from "./utils";
import { IPeriods } from "@entities/periods/types";

export function periodSeeds(server) {
  const mockedPeriodsList: IPeriods[] = generateStructuredPeriods();
  mockedPeriodsList.forEach((auth) => {
    server.create("period", auth);
  });
}
