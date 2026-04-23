import { useThemeStore } from "../index";
import {
  StyledSystemDarkModeOutline,
  StyledSystemLightModeOutline,
} from "./ThemeChange.styled";
import { IconButton } from "@admiral-ds/react-ui";
import React, { useState } from "react";

export const ThemeChange = () => {
  const { toggleTheme } = useThemeStore();
  const [isDarkTheme, setDarkTheme] = useState<boolean>(
    () => localStorage.getItem("theme-local") === "dark",
  );

  const handleChange = () => {
    const nextTheme = !isDarkTheme;
    setDarkTheme(nextTheme);

    if (nextTheme) {
      localStorage.setItem("theme-local", "dark");
      toggleTheme("dark");
    } else {
      localStorage.setItem("theme-local", "light");
      toggleTheme("light");
    }
  };

  return (
    <IconButton dimension="xl" onClick={handleChange}>
      {!isDarkTheme ? (
        <StyledSystemDarkModeOutline />
      ) : (
        <StyledSystemLightModeOutline />
      )}
    </IconButton>
  );
};
