import './App.css'
import {TodoListItem} from "./components/TodoListItem/TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

// Types //
export type FilterValues = "all" | "active" | "completed"

export type Tasks = {
    id: string
    title: string
    isDone: boolean
}
export type TodoLists = {
    id: string
    title: string
    filter: FilterValues
}

export const App = () => {

    // Data //

    const [todoLists, setTodoLists] = useState<TodoLists[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<Tasks[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Typescript", isDone: false},
        {id: v1(), title: "RTK query", isDone: false},
    ])

    // UI //

    const deleteTask = (taskId: Tasks["id"]) => {
        const nextTasksState: Tasks[] = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(nextTasksState)
    }

    const createTask = (taskTitle: Tasks["title"]) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        const newTasks = [...tasks, newTask]
        setTasks(newTasks)
    }

    const changeToDoListFilter = (todoListId: TodoLists['id'], filter: FilterValues) => {
        const newTodoLists = todoLists.map(todoList => {
            return todoList.id === todoListId ? {...todoList, filter} : todoList
        })
        setTodoLists(newTodoLists)
    }

    const changeTaskStatusState = (taskId: Tasks["id"], isDone: Tasks["isDone"]) => {
        const newStatusState = tasks.map(task => task.id === taskId ? {...task, isDone } : task)
        setTasks(newStatusState)
    }

    return (
        <div className="app">
            {todoLists.map(todoLists => {
                let filteredTasks = tasks
                if (todoLists.filter === "active") {
                    filteredTasks = tasks.filter(task => !task.isDone)
                }
                if (todoLists.filter === "completed") {
                    filteredTasks = tasks.filter(task => task.isDone)
                }
                return (
                    <TodoListItem key={todoLists.id}
                                  todoLists={todoLists}
                                  deleteTask={deleteTask}
                                  createTask={createTask}
                                  changeTaskStatusState={changeTaskStatusState}
                                  tasks={filteredTasks}
                                  changeToDoListFilter={changeToDoListFilter}
                                  date={"10.04.2026"}/>
                )
            })

            }
        </div>
    )
}