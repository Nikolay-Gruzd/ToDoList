import {FilterValues, TodoList} from "@/app/Main.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC} from "@/model/todolists-reducer.ts";
import {TodoListTitle} from "@/common/components/TodoListItem/TodoListTitle/TodoListTitle.tsx";


type Props = {
    todoLists: TodoList,
}

export const TodoListItem = ({ todoLists }: Props) => {

    const {id, filter} = todoLists;

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

    const changeToDoListFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: id, filter}))
    }
    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todoListId: id, title}))
    }

    return (
        <div>
            <TodoListTitle todoLists={todoLists}/>
            <CreateItemForm onCreateItem={createTaskHandler}/>

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
            )
            }
            <Box sx={containerSx}>
                <Button color='inherit'
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => changeToDoListFilter("all")}
                >
                    All
                </Button>
                <Button color='primary'
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeToDoListFilter("active")}
                >
                    Active
                </Button>
                <Button color='secondary'
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeToDoListFilter("completed")}
                >
                    Completed
                </Button>
            </Box>
            {/*<Box sx={{mt: '10px'}}>{date}</Box>*/}
        </div>
    )
}