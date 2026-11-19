import { EditableSpan } from "@/common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, deleteTodolistAC, DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks"
import s from "./TodolistTitle.module.css"

type Props = {
  todoLists: DomainTodolist
}

export const TodoListTitle = ({ todoLists }: Props) => {
  const { id, title } = todoLists

  const dispatch = useAppDispatch()

  const deleteTodoList = () => {
    dispatch(deleteTodolistAC({ id }))
  }
  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodoListTitle} />
      </h3>
      <IconButton onClick={deleteTodoList} aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  )
}
