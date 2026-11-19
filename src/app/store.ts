import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice.ts"
import { todolistSlice, todolistsReducer } from "@/features/todolists/model/todolists-slice.ts"
import { appReducer, appSlice } from "./app-slice.ts"

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  [tasksSlice.name]: tasksReducer,
  [todolistSlice.name]: todolistsReducer,
  [appSlice.name]: appReducer,
})

// создание store
export const store = configureStore({
  reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
