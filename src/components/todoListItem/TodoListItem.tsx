import {FilterValues, Task, TodoLists} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../createItemForm/CreateItemForm.tsx";

type Props = {
    todoLists: TodoLists;
    tasks: Task[]
    date?: string
    deleteTask: (todoListId: TodoLists['id'], taskId: string) => void
    createTask: (todoListId: TodoLists['id'], taskTitle: string) => void
    changeToDoListFilter: (todoListId: TodoLists['id'], filter: FilterValues) => void
    changeTaskStatus: (todoListId: TodoLists['id'], taskId: string, newStatusValue: boolean) => void
    deleteTodoList: (todoListId: TodoLists['id']) => void
}

export const TodoListItem = (
    {
        todoLists: {id, title, filter},
        tasks,
        date,
        deleteTask,
        createTask,
        changeToDoListFilter,
        changeTaskStatus,
        deleteTodoList
    }: Props) => {

    const changeFilterHandler = (filter: FilterValues) => {
        changeToDoListFilter(id, filter)
    }
    const deleteTodoListHandler = () => {
        deleteTodoList(id)
    }
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={deleteTodoListHandler}/>
            </div>

            <CreateItemForm onCreateItem={createTaskHandler}/>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
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
                        onClick={() => changeFilterHandler("all")}
                        className={filter === 'all' ? 'active-filter' : ''}/>
                <Button title="Active"
                        onClick={() => changeFilterHandler("active")}
                        className={filter === 'active' ? 'active-filter' : ''}/>
                <Button title="Completed"
                        onClick={() => changeFilterHandler("completed")}
                        className={filter === 'completed' ? 'active-filter' : ''}/>
            </div>
            <div>{date}</div>
        </div>
    )
}