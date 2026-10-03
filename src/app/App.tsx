import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Header } from "@/common/components"
import { getTheme } from "@/common/theme"
import { selectChangeThemeMode } from "@/app/app-selectors.ts"
import { Main } from "@/app/Main.tsx"
import { useAppSelector } from "@/common/hooks"

export const App = () => {
  // Data //
  const themeMode = useAppSelector(selectChangeThemeMode)
  const theme = getTheme(themeMode)

  // UI //
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
