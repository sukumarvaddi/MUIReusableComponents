import React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/700.css";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
