import { TShortNameTheme, useThemeStore } from "@features/ThemeChange";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

export const ThemeProviderLayout = ({ children }) => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme-local") || "light";

    toggleTheme(storageTheme as TShortNameTheme);
  }, []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
