import './App.css'
import {TodoListItem} from "./components/TodoListItem/TodoListItem.tsx";
import {useState} from "react";
import {getFilteredTasks} from "./Utilities/getFilteredTasks.ts";
import {v1} from "uuid";

// Types //

export type Tasks = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export const App = () => {

    // Data //

    const toDoListTitle = "What to learn"

    const [tasks, setTasks] = useState<Tasks[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Typescript", isDone: false},
        {id: v1(), title: "RTK query", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>("all")

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

    const filteredTasks = getFilteredTasks(tasks, filter)

    const changeToDoListFilter = (filter: FilterValues) => setFilter(filter)

    return (
        <div className="app">
            <TodoListItem deleteTask={deleteTask}
                          createTask={createTask}
                          title={toDoListTitle}
                          tasks={filteredTasks}
                          changeToDoListFilter={changeToDoListFilter}
                          date={"10.04.2026"}/>
        </div>
    )
}
