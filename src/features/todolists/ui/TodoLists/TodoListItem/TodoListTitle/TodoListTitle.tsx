import {EditableSpan} from "@/common/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks";
import {TodoList} from "@/app/Main.tsx";
import s from "./TodolistTitle.module.css"

type Props = {
    todoLists: TodoList
}

export const TodoListTitle = ({todoLists}: Props) => {
    const {id, title} = todoLists

    const dispatch = useAppDispatch()

    const deleteTodoList = () => {
        dispatch(deleteTodolistAC({id}))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div className={s.container}>
            <h3><EditableSpan value={title} onChange={changeTodoListTitle}/></h3>
            <IconButton onClick={deleteTodoList} aria-label="delete" size='small'>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    );
};