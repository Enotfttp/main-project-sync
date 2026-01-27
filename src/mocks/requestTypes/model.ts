import { hasMany, Model } from "miragejs";

export const requestTypeModels = {
  requestType: Model.extend({
    history: hasMany("history"),
  }),
};
