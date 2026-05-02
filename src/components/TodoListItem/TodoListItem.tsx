import {FilterValues, Tasks} from "../../App.tsx";
import {Button} from "../button/Button.tsx";

type Props = {
    title: string
    tasks: Tasks[]
    date?: string
    deleteTask: (taskId: number) => void
    changeToDoListFilter: (filter: FilterValues) => void
}

export const TodoListItem = ({title, tasks, date, deleteTask, changeToDoListFilter}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title="x" onClick={() => deleteTask(task.id)}/>
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