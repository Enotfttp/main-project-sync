import { useNotificationStore } from "./model/notificationStore";

let lastNotificationKey: string | null = null;
let lastNotificationAt = 0;

export const notifyRestError = (error: unknown) => {
  const err = error as any;
  const status = err?.response?.status as number | undefined;

  // Авторизация у нас централизованно обрабатывается в axios interceptors (401 -> refresh/logout)
  if (status === 401) return;

  const body =
    err?.response?.data?.message ??
    err?.response?.data ??
    err?.message ??
    "Ошибка запроса";

  const bodyString = typeof body === "string" ? body : JSON.stringify(body);
  const title = status ? `Ошибка ${status}` : "Ошибка запроса";
  const notificationKey = `${status ?? "na"}:${title}:${bodyString}`;

  const now = Date.now();
  if (
    lastNotificationKey === notificationKey &&
    now - lastNotificationAt < 2000
  ) {
    return;
  }

  lastNotificationKey = notificationKey;
  lastNotificationAt = now;

  useNotificationStore.getState().push({
    status: "error",
    title,
    body: bodyString,
  });
};

export const notifyRestSuccess = () => {
  useNotificationStore.getState().push({
    status: "success",
    title: "Успех",
    body: "Запрос выполнен успешно",
  });
};
