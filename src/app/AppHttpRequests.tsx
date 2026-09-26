import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan'
import axios from 'axios'
import {apiKey, token} from "@/app/token.ts"; // Секретный токен не добавлен в Git

export type FieldError = {
    error: string
    field: string
}

type CreateTodolistResponse = {
    data: { item: Todolist }
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}

type DeleteTodolistResponse = {
    data: {}
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}

type UpdateTodolistResponse = {
    data: {}
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => setTodolists(res.data))
    }, [])

    const createTodolist = (title: string) => {
        axios
            .post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'API-KEY': apiKey
                    }
                }
            )
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const deleteTodolist = (id: string) => {
        axios
            .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'API-KEY': apiKey
                }
            })
            .then(() => setTodolists(prev => prev.filter( tl => tl.id !== id)))
    }

    const changeTodolistTitle = (id: string, title: string) => {
            axios
                .put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'API-KEY': apiKey
                    }
                })
                .then(() => setTodolists(todolists.map( tl => tl.id === id ? { ...tl, title } : tl )))
    }

    const createTask = (todolistId: string, title: string) => {
    }

    const deleteTask = (todolistId: string, taskId: string) => {
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {
    }

    const changeTaskTitle = (task: any, title: string) => {
    }

    return (
        <div style={{margin: '20px'}}>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map((todolist) => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan value={todolist.title}
                                      onChange={title => changeTodolistTitle(todolist.id, title)}/>
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <Checkbox checked={task.isDone}
                                      onChange={e => changeTaskStatus(e, task)}/>
                            <EditableSpan value={task.title}
                                          onChange={title => changeTaskTitle(task, title)}/>
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
