import "./App.css"
import SetPages from "./pages/SetPages"
import { RecoilRoot } from "recoil"
import { ThemeProvider } from "@mui/material"
import theme from "./styles/theme"
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <SetPages />
        </RecoilRoot>
      </ThemeProvider>
    </div>
  )
}

export default App
