import type { NotificationItemProps } from "@admiral-ds/react-ui";
import { create } from "zustand";

export type RestNotificationStatus = NotificationItemProps["status"];

export interface RestNotification {
  id: string;
  status: RestNotificationStatus;
  title: string;
  body: string;
  createdAt: number;
}

const TEST = [
  {
    id: "1",
    status: "error",
    title: "Ошибка",
    body: "Ошибка запроса",
    createdAt: Date.now(),
  },
  {
    id: "2",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "3",
    status: "warning",
    title: "Предупреждение",
    body: "Предупреждение запроса",
    createdAt: Date.now(),
  },
  
  {
    id: "5",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "6",
    status: "warning",
    title: "Предупреждение",
    body: "Предупреждение запроса",
    createdAt: Date.now(),
  },
  {
    id: "7",
    status: "info",
    title: "Информация",
    body: "Информация запроса",
    createdAt: Date.now(),
  },
  {
    id: "8",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "9",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "10",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "11",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "12",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "13",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "14",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "15",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
  {
    id: "16",
    status: "success",
    title: "Успех",
    body: "Успешный запрос",
    createdAt: Date.now(),
  },
]


export interface NotificationStore {
  notifications: RestNotification[];
  push: (notification: Omit<RestNotification, "id" | "createdAt">) => string;
  remove: (id: string) => void;
  clear: () => void;
}

const makeId = () => {
  const c = globalThis.crypto as Crypto | undefined;
  if (c && typeof c.randomUUID === "function") {
    return c.randomUUID();
  }

  return `${Date.now()}_${Math.random()}`;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: TEST,

  push: (notification) => {
    const id = makeId();
    const next: RestNotification = {
      ...notification,
      id,
      createdAt: Date.now(),
    };

    set({ notifications: [...get().notifications, next] });
    return id;
  },

  remove: (id) =>
    set({
      notifications: get().notifications.filter((n) => n.id !== id),
    }),

  clear: () => set({ notifications: [] }),
}));
