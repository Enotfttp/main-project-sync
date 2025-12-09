import { generateStructuredServiceConnections } from "./utils";
import { IServiceConnectionList } from "@entities/serviceConnect";

export function serviceConnectionSeeds(server) {
  const mockedServiceConnectsList: IServiceConnectionList[] =
    generateStructuredServiceConnections();

  mockedServiceConnectsList.forEach((connection) => {
    server.create("serviceConnection", connection);
  });
}
