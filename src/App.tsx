import './App.css'
import {TodoListItem} from "./components/TodoListItem/TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

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
        debugger
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        const newTasks = {...tasks, [todoListId]: [newTask, ...tasks[todoListId]] }
        setTasks(newTasks)
    }

    const changeToDoListFilter = (todoListId: TodoLists['id'], filter: FilterValues) => {
        const newTodoLists = todoLists.map(todoList => {
            return todoList.id === todoListId ? {...todoList, filter} : todoList
        })
        setTodoLists(newTodoLists)
    }

    const changeTaskStatus = (todoListId: TodoLists['id'], taskId: Task["id"], isDone: Task["isDone"]) => {
        const newTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone} : task),
        }
        setTasks(newTasks)
    }

    const deleteTodoList = (todoListId: TodoLists['id']) => {
        setTodoLists(todoLists.filter(task => task.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    return (
        <div className="app">
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
                    <TodoListItem key={todoLists.id}
                                  todoLists={todoLists}
                                  deleteTodoList={deleteTodoList}
                                  deleteTask={deleteTask}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  tasks={filteredTasks}
                                  changeToDoListFilter={changeToDoListFilter}
                                  date={"10.04.2026"}/>
                )
            })

            }
        </div>
    )
}