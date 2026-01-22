import { Server } from "miragejs";

export function requestTypeRoutes(this: Server) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.get("/request-types/packages/:id", (schema: any) => {
    return schema.all("requestType").models.map((el) => el.attrs);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.get("/request-types/:id", (schema: any, request) => {
    const { id } = request.params;
    const requestTypes = schema.all("requestType").models.map((el) => el.attrs);

    return requestTypes.find((el) => el.id === id);
  });
}
