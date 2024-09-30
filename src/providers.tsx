import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";
import { GlobalContextProvider } from "./context/GlobalContext.tsx";
import { LanguageProvider } from "./context/LanguageProvider.tsx";

export default function withProviders<P extends React.JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  function WithProviders(props: P) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalContextProvider>
          <LanguageProvider>
            <Component {...props} />
          </LanguageProvider>
        </GlobalContextProvider>
      </ThemeProvider>
    );
  }

  return WithProviders;
}
