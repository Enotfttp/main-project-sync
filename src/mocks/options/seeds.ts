import { generateMockOptions } from "./utils";
import { IOption } from "@entities/options/types";

export function optionSeeds(server) {
  const mockedOptions: IOption[] = generateMockOptions();

  mockedOptions.forEach((auth) => {
    server.create("option", auth);
  });
}
