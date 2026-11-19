import { createSlice, nanoid } from "@reduxjs/toolkit"

// Types //
export type FilterValues = "all" | "active" | "completed"

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export const todolistSlice = createSlice({
  name: "todolists",
  initialState: [] as Todolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        state.push({ ...action.payload, filter: "all" })
      },
    ),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
  }),
})

export const { selectTodolists } = todolistSlice.selectors
export const { deleteTodolistAC, createTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } =
  todolistSlice.actions
export const todolistsReducer = todolistSlice.reducer
