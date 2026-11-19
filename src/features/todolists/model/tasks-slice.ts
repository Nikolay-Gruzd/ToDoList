import { createTodolistAC, deleteTodolistAC } from "./todolists-slice.ts"
import { createSlice, nanoid } from "@reduxjs/toolkit"

export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type TasksState = Record<string, Task[]> // { [key: string]: Task[] }

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todoListId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todoListId].findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todoListId].splice(index, 1)
      }
    }),
    createTaskAC: create.preparedReducer(
      (payload: { todoListId: string; title: string }) => ({
        payload: { todoListId: payload.todoListId, taskId: nanoid(), title: payload.title },
      }),
      (state, action) => {
        state[action.payload.todoListId].unshift({
          id: action.payload.taskId,
          title: action.payload.title,
          isDone: false,
        })
      },
    ),
    changeTaskStatusAC: create.reducer<{ todoListId: string; taskId: string; isDone: boolean }>((state, action) => {
      const task = state[action.payload.todoListId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    }),
    changeTaskTitleAC: create.reducer<{ todoListId: string; taskId: string; title: string }>((state, action) => {
      const task = state[action.payload.todoListId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { createTaskAC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
