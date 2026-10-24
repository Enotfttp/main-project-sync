import { HttpResponse } from "msw";

export const API_URL = "/api/v1";

export const apiPath = (path: string) => `${API_URL}${path}`;

export const notFound = (message = "Not found") =>
  HttpResponse.json({ message, code: 404 }, { status: 404 });

export const badRequest = (message: string) =>
  HttpResponse.json({ message, code: 400 }, { status: 400 });

export const noContent = () => new HttpResponse(null, { status: 204 });

export const readJson = async <T>(request: Request): Promise<T | undefined> => {
  try {
    return (await request.json()) as T;
  } catch {
    return undefined;
  }
};
