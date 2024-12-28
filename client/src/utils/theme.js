import { createTheme } from "@mui/material/styles";
import { Colors } from "../utils/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: Colors.black,
    },
    secondary: {
      main: Colors.secondary,
    },
    cleanLightBlack: {
      main: Colors.cleanLightBlack,
    },
    white: {
      main: Colors.white,
    },
    red: {
      main: Colors.redlet,
    },
  },
  typography: {
    fontFamily: "'Baloo 2', sans-serif",
  },
});
