import './App.css'
import {TodoListItem} from "./components/TodoListItem/TodoListItem.tsx";
import {useState} from "react";

export type Tasks = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {

    // Data //

    const title1 = "What to learn"
    // const title2 = "Songs"
    // const title3 = "Books"

    const [tasks1, setTasks1] = useState<Tasks[]> ([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "React", isDone: false },
        { id: 4, title: "Redux", isDone: false },
        { id: 5, title: "Typescript", isDone: false },
        { id: 6, title: "RTK query", isDone: false },
    ])
    // let tasks2: Tasks[] = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am happy", isDone: true },
    //     { id: 3, title: "Yo", isDone: false },
    // ]
    // let tasks3: Tasks[] = []

    // Code //

    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks1.filter(task => {
            return task.id !== taskId
        })
        setTasks1(filteredTasks)
    }

    return (
        <div className="app">
            <TodoListItem deleteTask={deleteTask} title={title1} tasks={tasks1} date={"10.04.2026"}/>
            {/*<TodoListItem deleteTask={deleteTask} title={title2} tasks={tasks2}/>*/}
            {/*<TodoListItem deleteTask={deleteTask} title={title3} tasks={tasks3}/>*/}
        </div>
    )
}
