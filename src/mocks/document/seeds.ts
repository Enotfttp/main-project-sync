import { createMockDocuments } from "./utils";

export function documentSeeds(server) {
  const mockedDocuments = createMockDocuments();

  mockedDocuments.forEach((auth) => {
    server.create("document", auth);
  });
}
