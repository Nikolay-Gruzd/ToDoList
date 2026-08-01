import type {TasksState} from '../App'
import {CreateTodoListAction, DeleteTodoListAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    const {type, payload} = action
    switch (type) {
        case 'create_todolist': {
            return {...state, [payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[payload.id]
            return newState
        }
        case 'delete_task': {
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].filter(task => task.id !== payload.taskId)
            }
        }
        case 'create_task': {
            const newTask = {id: payload.taskId, title: payload.title, isDone: false}
            return {
                ...state,
                [payload.todoListId]: [newTask, ...state[payload.todoListId]]
            }
        }
        case 'change_task_status': {
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].map(
                    task => task.id === payload.taskId ? {...task, isDone: payload.isDone} : task
                )
            }
        }
        case 'change_task_title': {
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].map(
                    task => task.id === payload.taskId ? {...task, title: payload.title} : task
                )
            }
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: { todoListId: string, taskId: string }) => {
    return {type: 'delete_task', payload: {todoListId: payload.todoListId, taskId: payload.taskId}} as const
}

export const createTaskAC = (payload: { todoListId: string, title: string, }) => {
    const taskId = v1()
    return {type: 'create_task', payload: {todoListId: payload.todoListId, taskId, title: payload.title}} as const
}

export const changeTaskStatusAC = (payload: { todoListId: string, taskId: string, isDone: boolean }) => {
    return {
        type: 'change_task_status',
        payload: {todoListId: payload.todoListId, taskId: payload.taskId, isDone: payload.isDone}
    } as const
}

export const changeTaskTitleAC = (payload: {todoListId: string, taskId: string, title: string}) => {
    return {
        type: 'change_task_title',
        payload: {todoListId: payload.todoListId, taskId: payload.taskId, title: payload.title},
    } as const
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodoListAction
    | DeleteTodoListAction
    | DeleteTaskAction
    | CreateTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction