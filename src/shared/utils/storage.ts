export const storage = {
  getToken: (): string | null => localStorage.getItem("token"),
  setToken: (token: string): void => localStorage.setItem("token", token),
  removeToken: (): void => localStorage.removeItem("token"),
  getItem: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
