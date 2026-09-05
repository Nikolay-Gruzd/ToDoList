import {RootState} from "./store.ts";
import {ThemeMode} from "./app-reducer.ts";

export const selectChangeThemeMode = (state: RootState): ThemeMode => state.themeMode.themeMode