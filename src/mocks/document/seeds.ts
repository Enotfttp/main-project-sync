import { generateMockDocuments } from "./utils";
import { IDocuments } from "@entities/documents/types";

export function documentSeeds(server) {
  const mockedDocuments: IDocuments[] = generateMockDocuments();

  mockedDocuments.forEach((auth) => {
    server.create("document", auth);
  });
}
