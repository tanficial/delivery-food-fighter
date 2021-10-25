import { createTheme } from "@mui/material"

export const colors = {
  yellow200: "#ffb300",
  yellow100: "#ffe54c",
  yellow300: "#c68400",
  black500: "#9e9e9e",
  black600: "#757575",
  black700: "#616161",
  black800: "#424242",
  black900: "#212121",
}

const theme = createTheme({
  typography: {
    fontFamily: "'Elice Digital Baeum', sans-serif",
  },
  palette: {
    primary: {
      main: "#ffb300",
      light: "#ffe54c",
      dark: "#c68400",
      contrastText: "#fff",
    },
  },
})

export const blur = createTheme({
  typography: {
    fontFamily: "'Elice Digital Baeum', sans-serif",
  },
  palette: {
    primary: {
      main: "#9e9e9e",
    },
  },
})

export default theme
