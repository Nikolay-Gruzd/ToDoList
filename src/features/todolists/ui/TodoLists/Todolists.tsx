import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodoListItem } from "@/features/todolists/ui/TodoLists/TodoListItem/TodoListItem.tsx"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { fetchTodolistsTC, selectTodolists } from "@/features/todolists/model/todolists-slice.ts"
import { useEffect } from "react"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // todolistsApi.getTodolists().then((todolists) => {
    //   dispatch(setTodolistsAC({ todolists }))
    //   console.log(todolists)
    // })
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodoListItem todoLists={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
