import { DARK_THEME, LIGHT_THEME } from "@admiral-ds/react-ui";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TShortNameTheme = "dark" | "light";

interface ThemeStore {
  shortNameTheme: TShortNameTheme;
  theme: typeof DARK_THEME | typeof LIGHT_THEME;
  toggleTheme(name: TShortNameTheme): void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, _) => ({
      shortNameTheme: "light",
      theme: LIGHT_THEME,
      toggleTheme(name: TShortNameTheme) {
        const isDark = name === "dark";
        set({
          shortNameTheme: isDark ? "dark" : "light",
          theme: isDark ? DARK_THEME : LIGHT_THEME,
        });
      },
    }),
    {
      name: "theme",
    },
  ),
);
