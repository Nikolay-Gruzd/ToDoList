import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import List from "@mui/material/List";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import Checkbox from "node_modules/@mui/material/Checkbox";
import { EditableSpan } from "../../EditableSpan/EditableSpan";
import ListItem from "node_modules/@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodoList} from "@/app/Main.tsx";
import {getListItemSx} from "@/common/components/TodoListItem/TodolistItem.styles.ts";

type Props = {
    todoLists : TodoList
}

export const Tasks = ({todoLists}: Props) => {
    const {id, filter} = todoLists

    const tasks = useAppSelector(selectTasks);

    const dispatch = useAppDispatch()

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => {
                        const deleteTask = () => {
                            dispatch(deleteTaskAC({todoListId: id, taskId: task.id}))
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC({todoListId: id, taskId: task.id, isDone: newStatusValue}))
                        }
                        const changeTaskTitle = (title: string) => {
                            dispatch(changeTaskTitleAC({todoListId: id, taskId: task.id, title}))
                        }

                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitle}/>
                                </div>
                                <IconButton onClick={deleteTask} aria-label="delete" size='small'>
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            ) }
        </>
    );
};