import {FilterValues, Tasks} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: Tasks[]
    date?: string
    deleteTask: (taskId: string) => void
    createTask: (taskTitle: string) => void
    changeToDoListFilter: (filter: FilterValues) => void
}

export const TodoListItem = ({
                                 title,
                                 tasks,
                                 date,
                                 deleteTask,
                                 createTask,
                                 changeToDoListFilter
                             }: Props) => {

    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' ? createTaskHandler() : null
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}
                />
                <Button title="+" onClick={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title="x" onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )
            }
            <div>
                <Button title="All" onClick={() => changeToDoListFilter("all")}/>
                <Button title="Active" onClick={() => changeToDoListFilter("active")}/>
                <Button title="Completed" onClick={() => changeToDoListFilter("completed")}/>
            </div>
            <div>{date}</div>
        </div>
    )
}