import { RootState } from "./store.ts"
import { ThemeMode } from "./app-slice.ts"

export const selectChangeThemeMode = (state: RootState): ThemeMode => state.app.themeMode
