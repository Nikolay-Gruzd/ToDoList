import './App.css'
import {TodoListItem} from "./components/todoListItem/TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components/createItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from "@mui/material/Paper";

// Types //
export type FilterValues = "all" | "active" | "completed"

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TasksState = {
    [key: TodoLists['id']]: Task[]
}
export type TodoLists = {
    id: string
    title: string
    filter: FilterValues
}

export const App = () => {

    // Data //

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoLists[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Typescript", isDone: false},
            {id: v1(), title: "RTK query", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Salt", isDone: false},
        ]
    })

    // UI //

    const deleteTask = (todoListId: TodoLists['id'], taskId: Task["id"]) => {
        const newTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)
        }
        setTasks(newTasks)
    }

    const createTask = (todoListId: TodoLists['id'], taskTitle: Task["title"]) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        const newTasks = {...tasks, [todoListId]: [newTask, ...tasks[todoListId]]}
        setTasks(newTasks)
    }

    const changeTaskStatus = (todoListId: TodoLists['id'], taskId: Task["id"], isDone: Task["isDone"]) => {
        const newTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone} : task),
        }
        setTasks(newTasks)
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        setTasks(
            {...tasks, [todoListId] : tasks[todoListId].map(task => task.id === taskId ? {...task, title} : task)}
        )
    }

    const changeToDoListFilter = (todoListId: TodoLists['id'], filter: FilterValues) => {
        const newTodoLists = todoLists.map(todoList => {
            return todoList.id === todoListId ? {...todoList, filter} : todoList
        })
        setTodoLists(newTodoLists)
    }

    const deleteTodoList = (todoListId: TodoLists['id']) => {
        setTodoLists(todoLists.filter(task => task.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const createTodolistHandler = (title: string) => {
        const todoListId = v1()
        const newTodoList: TodoLists = {id: todoListId, title: title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({[todoListId]: [], ...tasks})
    }

    const changeTodoListTitle = (todolistId: string, title: string) => {
        setTodoLists(
            todoLists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist)
        )
    }

    return (
        <div className="app">
            <AppBar position='static' sx={{mb: '30px'}}>
                <Toolbar>
                    <Container maxWidth={'lg'}>
                        <IconButton color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Button color='inherit'>Sign in</Button>
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
                                                  date={"10.04.2026"}/>
                                </Paper>
                            </Grid>
                        )
                    }) }
                </Grid>
            </Container>
        </div>
    )
}