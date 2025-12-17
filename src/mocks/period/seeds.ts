import { generateStructuredPeriods } from "./utils";
import { IPeriodsList } from "@entities/periods/periods.types";

export function periodSeeds(server) {
  const mockedPeriodsList: IPeriodsList[] = generateStructuredPeriods();
  mockedPeriodsList.forEach((auth) => {
    server.create("period", auth);
  });
}
