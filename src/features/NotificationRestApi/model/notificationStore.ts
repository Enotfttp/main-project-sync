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
  notifications: [],

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
