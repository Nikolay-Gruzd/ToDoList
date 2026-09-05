import {createAction, createReducer} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'

export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>('app/changeThemeMode')

const initialState = {
    themeMode: 'dark' as ThemeMode
}

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action)=>{
            state.themeMode = action.payload.themeMode
        })
})