import {FilterValues, Task, TodoLists} from "../../App.tsx";
import {Button} from "../button/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../createItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../editableSpan/EditableSpan.tsx";

type Props = {
    todoLists: TodoLists,
    tasks: Task[],
    date?: string,
    deleteTask: (todoListId: string, taskId: string) => void,
    createTask: (todoListId: string, taskTitle: string) => void,
    changeToDoListFilter: (todoListId: string, filter: FilterValues) => void,
    changeTaskStatus: (todoListId: string, taskId: string, newStatusValue: boolean) => void,
    deleteTodoList: (todoListId: string) => void,
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void,
    changeTodoListTitle: (todolistId: string, title: string) => void
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
        deleteTodoList,
        changeTaskTitle,
        changeTodoListTitle
    }: Props) => {

    const deleteTodoListHandler = () => {
        deleteTodoList(id)
    }
    const changeTodoListHandler = (title: string) => {
        changeTodoListTitle(id, title)
    }
    const changeFilterHandler = (filter: FilterValues) => {
        changeToDoListFilter(id, filter)
    }
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={title} onChange={changeTodoListHandler}/></h3>
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
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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