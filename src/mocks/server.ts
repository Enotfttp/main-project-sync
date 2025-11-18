import { adminModels } from "./admin/model";
import { adminRoutes } from "./admin/routes";
import { adminSeeds } from "./admin/seeds";
import { authModels } from "./auth/model";
import { authRoutes } from "./auth/routes";
import { authSeeds } from "./auth/seeds";
import { eventModels } from "./event/model";
import { eventRoutes } from "./event/routes";
import { eventSeeds } from "./event/seeds";
import { periodModels } from "./period/model";
import { periodRoutes } from "./period/routes";
import { periodSeeds } from "./period/seeds";
import { rkoModels } from "./rko/model";
import { rkoRoutes } from "./rko/routes";
import { rkoSeeds } from "./rko/seeds";
import { serviceConnectionModels } from "./serviceConnection/model";
import { serviceConnectionRoutes } from "./serviceConnection/routes";
import { serviceConnectionSeeds } from "./serviceConnection/seeds";
import { createServer } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      ...authModels,
      ...adminModels,
      ...eventModels,
      ...periodModels,
      ...rkoModels,
      ...serviceConnectionModels,
    },

    seeds(server) {
      authSeeds(server);
      adminSeeds(server);
      eventSeeds(server);
      periodSeeds(server);
      rkoSeeds(server);
      serviceConnectionSeeds(server);
    },

    routes() {
      this.namespace = "api";

      authRoutes.call(this);
      adminRoutes.call(this);
      eventRoutes.call(this);
      periodRoutes.call(this);
      rkoRoutes.call(this);
      serviceConnectionRoutes.call(this);

      this.passthrough();
    },
  });
}
