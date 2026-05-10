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
    changeTaskStatusState: (taskId: string, newStatusValue: boolean) => void
    filter?: string

}

export const TodoListItem = ({
                                 title,
                                 tasks,
                                 date,
                                 deleteTask,
                                 createTask,
                                 changeToDoListFilter,
                                 changeTaskStatusState,
                                 filter
                             }: Props) => {

    // Data //

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // UI //

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
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
                       className={error ? 'error' : ''}
                />
                <Button title="+" onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatusState(task.id, newStatusValue)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title="x" onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )
            }
            <div>
                <Button title="All"
                        onClick={() => changeToDoListFilter("all")}
                        className={filter === 'all' ? 'active-filter' : ''}/>
                <Button title="Active"
                        onClick={() => changeToDoListFilter("active")}
                        className={filter === 'active' ? 'active-filter' : ''}/>
                <Button title="Completed"
                        onClick={() => changeToDoListFilter("completed")}
                        className={filter === 'completed' ? 'active-filter' : ''}/>
            </div>
            <div>{date}</div>
        </div>
    )
}