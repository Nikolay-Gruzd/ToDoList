import {FilterValues, Tasks} from "../App.tsx";

export const getFilteredTasks = (tasks: Tasks[], filter: FilterValues) => {
    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    }
    return filteredTasks
}