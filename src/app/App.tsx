import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {Header} from "@/common/components/Header/Header.tsx";
import {getTheme} from "@/common/theme/index.ts";
import {selectChangeThemeMode} from "@/app/app-selectors.ts";
import {Main} from "@/app/Main.tsx";

export const App = () => {
    // Data //
    const themeMode = useAppSelector(selectChangeThemeMode)
    const theme = getTheme(themeMode)

    // UI //
    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}