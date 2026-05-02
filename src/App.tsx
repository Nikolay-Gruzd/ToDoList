import './App.css'
import {TodoListItem} from "./components/TodoListItem/TodoListItem.tsx";
import {useState} from "react";

export type Tasks = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export const App = () => {

    // Data //

    const title1 = "What to learn"

    const [tasks, setTasks] = useState<Tasks[]> ([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "React", isDone: false },
        { id: 4, title: "Redux", isDone: false },
        { id: 5, title: "Typescript", isDone: false },
        { id: 6, title: "RTK query", isDone: false },
    ])

    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<FilterValues>("all")
    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter( task => !task.isDone)
    }
    if ( filter === "completed") {
        filteredTasks = tasks.filter( task => task.isDone)
    }
    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    return (
        <div className="app">
            <TodoListItem deleteTask={deleteTask}
                          title={title1}
                          tasks={filteredTasks}
                          changeFilter={changeFilter}
                          date={"10.04.2026"}/>
        </div>
    )
}
