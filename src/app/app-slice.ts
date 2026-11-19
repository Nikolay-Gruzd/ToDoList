import { createSlice } from "@reduxjs/toolkit"
// import { selectChangeThemeMode } from "@/app/app-selectors.ts"

export type ThemeMode = "dark" | "light"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
  },
  selectors: {
    selectChangeThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
})

export const { selectChangeThemeMode } = appSlice.selectors

export const { changeThemeModeAC } = appSlice.actions

export const appReducer = appSlice.reducer
