import { adminModels } from "./admin/model";
import { adminRoutes } from "./admin/routes";
import { adminSeeds } from "./admin/seeds";
import { authModels } from "./auth/model";
import { authRoutes } from "./auth/routes";
import { authSeeds } from "./auth/seeds";
import { documentModels } from "./document/model";
import { documentRoutes } from "./document/routes";
import { documentSeeds } from "./document/seeds";
import { historyModels } from "./history/model";
import { historyRoutes } from "./history/routes";
import { historySeeds } from "./history/seeds";
import { optionModels } from "./options/model";
import { optionRoutes } from "./options/routes";
import { optionSeeds } from "./options/seeds";
import { packageModels } from "./package/model";
import { packageRoutes } from "./package/routes";
import { packageSeeds } from "./package/seeds";
import { periodModels } from "./period/model";
import { periodRoutes } from "./period/routes";
import { periodSeeds } from "./period/seeds";
import { scheduleModels } from "./schedule/model";
import { scheduleRoutes } from "./schedule/routes";
import { scheduleSeeds } from "./schedule/seeds";
import { createServer } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      ...authModels,
      ...adminModels,
      ...periodModels,
      ...scheduleModels,
      ...documentModels,
      ...packageModels,
      ...historyModels,
      ...optionModels,
    },

    seeds(server) {
      authSeeds(server);
      adminSeeds(server);
      periodSeeds(server);
      scheduleSeeds(server);
      documentSeeds(server);
      packageSeeds(server);
      historySeeds(server);
      optionSeeds(server);
    },

    routes() {
      this.namespace = "api";

      authRoutes.call(this);
      adminRoutes.call(this);
      periodRoutes.call(this);
      scheduleRoutes.call(this);
      documentRoutes.call(this);
      packageRoutes.call(this);
      historyRoutes.call(this);
      optionRoutes.call(this);

      this.passthrough();
    },
  });
}
