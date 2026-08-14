import './App.css'
import {TodoListItem} from "../components/todoListItem/TodoListItem.tsx";
import {useReducer, useState} from "react";
import {CreateItemForm} from "../components/createItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from "@mui/material/Paper";
import {containerSx} from "../components/todoListItem/TodolistItem.styles.ts";
import {NavButton} from "../NavButton.ts";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "../model/tasks-reducer.ts";

// Types //
type ThemeMode = 'dark' | 'light'

export type FilterValues = "all" | "active" | "completed"

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TasksState = {
    [key: string]: Task[]
}
export type TodoList = {
    id: string
    title: string
    filter: FilterValues
}

export const App = () => {

    // Data //

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

    const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

    // UI //

    const deleteTask = (todoListId: string, taskId: string) => {
        const action = deleteTaskAC({todoListId, taskId})
        dispatchToTasks(action)
    }

    const createTask = (todoListId: string, taskTitle: string) => {
        const action = createTaskAC({todoListId, title: taskTitle})
        dispatchToTasks(action)
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC({todoListId: todoListId, taskId, isDone})
        dispatchToTasks(action)
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC({todoListId, taskId, title})
        dispatchToTasks(action)
    }

    const changeToDoListFilter = (todoListId: string, filter: FilterValues) => {
        const action = changeTodolistFilterAC({id: todoListId, filter})
        dispatchToTodolists(action)
    }

    const deleteTodoList = (todoListId: string) => {
        const action = deleteTodolistAC(todoListId)
        dispatchToTodolists(action)
        delete tasks[todoListId]
        dispatchToTasks(action)
    }

    const createTodolistHandler = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTodoListTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC({id: todolistId, title})
        dispatchToTodolists(action)
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4'
            }
        }
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position='static' sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color='inherit'>
                                <MenuIcon />
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolistHandler}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists.map(todoLists => {
                            const todoListsTasks = tasks[todoLists.id]
                            let filteredTasks = todoListsTasks
                            if (todoLists.filter === "active") {
                                filteredTasks = todoListsTasks.filter(task => !task.isDone)
                            }
                            if (todoLists.filter === "completed") {
                                filteredTasks = todoListsTasks.filter(task => task.isDone)
                            }
                            return (
                                <Grid key={todoLists.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <TodoListItem key={todoLists.id}
                                                      todoLists={todoLists}
                                                      deleteTodoList={deleteTodoList}
                                                      changeToDoListFilter={changeToDoListFilter}
                                                      changeTodoListTitle={changeTodoListTitle}
                                                      tasks={filteredTasks}
                                                      deleteTask={deleteTask}
                                                      createTask={createTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      changeTaskTitle={changeTaskTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        }) }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}