import { generateMockPackages } from "./utils";
import { IPackage } from "@entities/package/types";

export function packageSeeds(server) {
  const mockedPackages: IPackage[] = generateMockPackages();

  mockedPackages.forEach((auth) => {
    server.create("package", auth);
  });
}
