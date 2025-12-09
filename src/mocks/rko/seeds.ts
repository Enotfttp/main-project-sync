import { generateMockRKOList } from "./utils";
import { IRKOList } from "@entities/rko";

export function rkoSeeds(server) {
  const mockedRKOList: IRKOList[] = generateMockRKOList();

  mockedRKOList.forEach((auth) => {
    server.create("rko", auth);
  });
}
