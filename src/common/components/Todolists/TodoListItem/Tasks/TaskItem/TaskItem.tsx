import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {Task} from "@/app/Main.tsx";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {getListItemSx} from "@/common/components/Todolists/TodoListItem/TodolistItem.styles.ts";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
    task: Task
    todoListId: string
}

export const TaskItem = ({task, todoListId}: Props) => {

    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todoListId, taskId: task.id}))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todoListId, taskId: task.id, isDone: newStatusValue}))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todoListId, taskId: task.id, title}))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask} aria-label="delete" size='small'>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    )
};