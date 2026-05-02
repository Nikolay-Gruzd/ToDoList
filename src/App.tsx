import './App.css'
import {TodoListItem} from "./components/TodoListItem/TodoListItem.tsx";
import {useState} from "react";
import {getFilteredTasks} from "./Utilities/getFilteredTasks.ts";

// Types //

export type Tasks = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export const App = () => {

    // Data //

    const toDoListTitle = "What to learn"

    const [tasks, setTasks] = useState<Tasks[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Typescript", isDone: false},
        {id: 6, title: "RTK query", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>("all")

    // UI //

    const deleteTask = (taskId: Tasks["id"]) => {
        const nextTasksState: Tasks[] = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(nextTasksState)
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    const changeToDoListFilter = (filter: FilterValues) => setFilter(filter)

    return (
        <div className="app">
            <TodoListItem deleteTask={deleteTask}
                          title={toDoListTitle}
                          tasks={filteredTasks}
                          changeToDoListFilter={changeToDoListFilter}
                          date={"10.04.2026"}/>
        </div>
    )
}
