import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    rating: {
      active: React.CSSProperties["color"];
    };
    snackbar: {
      background: React.CSSProperties["color"];
    };
    backdrop: {
      overlay: React.CSSProperties["color"];
    };
    outline: {
      border: React.CSSProperties["color"];
    };
    standard: {
      border: React.CSSProperties["color"];
    };
    toolbar: {
      background: React.CSSProperties["color"];
    };
  }

  interface ThemeOptions {
    rating: {
      active: React.CSSProperties["color"];
    };
    snackbar: {
      background: React.CSSProperties["color"];
    };
    backdrop: {
      overlay: React.CSSProperties["color"];
    };
    outline: {
      border: React.CSSProperties["color"];
    };
    standard: {
      border: React.CSSProperties["color"];
    };
    toolbar: {
      background: React.CSSProperties["color"];
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008080",
      dark: "#006666",
      light: "#00ACAA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E5A925",
      dark: "#CC9621",
      light: "#F2B227",
      contrastText: "#351617",
    },
    error: {
      main: "#D32F2F",
      dark: "#C62828",
      light: "#EF5350",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#ED6C02",
      dark: "#E65100",
      light: "#FF9800",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#351617",
      dark: "rgba(51, 21, 22, 1)",
      light: "#823739",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#2E7D32",
      dark: "#1B5E20",
      light: "#4CAF50",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#351617",
      secondary: "rgba(53, 22, 23, 0.6)",
      disabled: "rgba(53, 22, 23, 0.38)",
    },
    action: {
      active: "rgba(53, 22, 23, 0.54)",
      hover: "rgba(53, 22, 23, 0.04)",
      selected: "rgba(53, 22, 23, 0.08)",
      disabled: "rgba(53, 22, 23, 0.26)",
      disabledBackground: "rgba(53, 22, 23, 0.12)",
      focus: "rgba(53, 22, 23, 0.12)",
    },
    background: {
      paper: "rgba(255, 255, 255, 1)",
      default: "rgba(255, 255, 255, 1)",
    },
    divider: "rgba(53, 22, 23, 0.12)",
  },
  rating: {
    active: "rgba(229, 169, 37, 1)",
  },
  snackbar: {
    background: "rgba(53, 22, 23, 1)",
  },
  backdrop: {
    overlay: "rgba(53, 22, 23, 0.5)",
  },
  outline: {
    border: "rgba(53, 22, 23, 0.23)",
  },
  standard: {
    border: "rgba(53, 22, 23, 0.42)",
  },
  toolbar: {
    background: "#EBE9DE",
  },

  typography: {
    fontFamily: `Source Sans Pro, Helvetica, Arial, sans-serif`,
    fontWeightMedium: 600,
    h1: {
      letterSpacing: "-1.5px",
    },
    h2: {
      letterSpacing: "-0.5px",
    },
    h3: {
      letterSpacing: "0px",
      fontSize: "3rem",
    },
    h4: {
      letterSpacing: "0.25px",
      fontSize: "2.125rem",
    },
    h5: {
      letterSpacing: "0px",
      fontSize: "1.5rem",
    },
    h6: {
      letterSpacing: "0.15px",
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    subtitle1: {
      letterSpacing: "0.15px",
      fontSize: "1rem",
    },
    subtitle2: {
      letterSpacing: "0.1px",
      fontSize: ".875rem",
      fontWeight: 600,
    },
    body1: {
      letterSpacing: "0.15px",
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
      fontSize: ".875rem",
      letterSpacing: "0.15px",
    },
    caption: {
      fontWeight: 400,
      fontSize: ".75rem",
      letterSpacing: "0.4px",
    },
    overline: {
      fontWeight: 400,
      fontSize: ".75rem",
      letterSpacing: "0.4px",
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 600,
      fontSize: ".9375rem",
      letterSpacing: "0.46px",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
