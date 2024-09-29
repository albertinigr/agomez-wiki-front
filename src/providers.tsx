import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";

export default function withProviders<P extends React.JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  function WithProviders(props: P) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithProviders;
}
