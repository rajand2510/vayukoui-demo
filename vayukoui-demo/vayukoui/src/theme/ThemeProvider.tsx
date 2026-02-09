import React, { useEffect } from "react";
import "../styles/variables.css";

type ThemeMode = "light" | "dark";

export function ThemeProvider({
  children,
  theme,
  mode = "light",
}: {
  children: React.ReactNode;
  theme?: Record<string, string>;
  mode?: ThemeMode;
}) {
  // Apply custom tokens
  useEffect(() => {
    if (!theme) return;

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--vk-${key}`,
        value
      );
    });
  }, [theme]);

  // Apply theme mode
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return <>{children}</>;
}
