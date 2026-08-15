import './App.css'
import {TodoListItem} from "../components/todoListItem/TodoListItem.tsx";
import {useState} from "react";
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
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
} from "../model/tasks-reducer.ts";
import {RootState} from "./store.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";

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

    const todoLists = useAppSelector<RootState, TodoList[]>(state => state.todolists)
    const tasks = useAppSelector<RootState, TasksState>(state => state.tasks)
    
    const dispatch = useAppDispatch()

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

    // const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

    // UI //

    const deleteTask = (todoListId: string, taskId: string) => {
        dispatch(deleteTaskAC({todoListId, taskId}))
    }

    const createTask = (todoListId: string, taskTitle: string) => {
        dispatch(createTaskAC({todoListId, title: taskTitle}))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todoListId: todoListId, taskId, isDone}))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todoListId, taskId, title}))
    }

    const changeToDoListFilter = (todoListId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todoListId, filter}))
    }

    const deleteTodoList = (todoListId: string) => {
        dispatch(deleteTodolistAC(todoListId))
        // delete tasks[todoListId]
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeTodoListTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
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
                        <CreateItemForm onCreateItem={createTodolist}/>
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