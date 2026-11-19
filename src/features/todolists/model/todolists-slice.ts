import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

// Types //
export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((_state, action) => {
      return action.payload.todolists.map((todolist) => {
        return { ...todolist, filter: "all" }
      })
    }),
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        state.push({ ...action.payload, filter: "all", addedAt: "", order: 0 })
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
export const { setTodolistsAC, deleteTodolistAC, createTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } =
  todolistSlice.actions
export const todolistsReducer = todolistSlice.reducer

export const fetchTodolistsTC = createAsyncThunk(`${todolistSlice.name}/fetchTodolistsTC`, (_, thunkAPI) => {
  // в санке можно делать побочные эффекты (запросы на сервер)
  todolistsApi.getTodolists().then((todolists) => {
    // и диспатчить экшены (action) или другие санки (thunk)
    thunkAPI.dispatch(setTodolistsAC({ todolists }))
  })
})
