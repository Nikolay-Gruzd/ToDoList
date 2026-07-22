import {FilterValues, Task, TodoLists} from "../../App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../createItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../editableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";


type Props = {
    todoLists: TodoLists,
    tasks: Task[],
    // date?: string,
    deleteTask: (todoListId: string, taskId: string) => void,
    createTask: (todoListId: string, taskTitle: string) => void,
    changeToDoListFilter: (todoListId: string, filter: FilterValues) => void,
    changeTaskStatus: (todoListId: string, taskId: string, newStatusValue: boolean) => void,
    deleteTodoList: (todoListId: string) => void,
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void,
    changeTodoListTitle: (todolistId: string, title: string) => void
}

export const TodoListItem = (
    {
        todoLists: {id, title, filter},
        tasks,
        deleteTask,
        createTask,
        changeToDoListFilter,
        changeTaskStatus,
        deleteTodoList,
        changeTaskTitle,
        changeTodoListTitle
    }: Props) => {

    const deleteTodoListHandler = () => {
        deleteTodoList(id)
    }
    const changeTodoListHandler = (title: string) => {
        changeTodoListTitle(id, title)
    }
    const changeFilterHandler = (filter: FilterValues) => {
        changeToDoListFilter(id, filter)
    }
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={title} onChange={changeTodoListHandler}/></h3>
                <IconButton onClick={deleteTodoListHandler} aria-label="delete" size='small'>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>

            <CreateItemForm onCreateItem={createTaskHandler}/>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={deleteTaskHandler} aria-label="delete" size='small'>
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
                        onClick={() => changeFilterHandler("all")}
                >
                    All
                </Button>
                <Button color='primary'
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler("active")}
                >
                    Active
                </Button>
                <Button color='secondary'
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler("completed")}
                >
                    Completed
                </Button>
            </Box>
            {/*<Box sx={{mt: '10px'}}>{date}</Box>*/}
        </div>
    )
}