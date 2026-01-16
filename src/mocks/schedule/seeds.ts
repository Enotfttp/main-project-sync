import { generateMockSchedules } from "./utils";
import { IPaymentSchedule } from "@entities/schedule/types";

export function scheduleSeeds(server) {
  const mockedSchedules: IPaymentSchedule[] = generateMockSchedules();

  mockedSchedules.forEach((auth) => {
    server.create("schedule", auth);
  });
}
