import type { TasksState } from '../App'
import {CreateTodoListAction, DeleteTodoListAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    const {type, payload} = action
    switch (type) {
        case 'create_todolist': {
            return { ...state, [payload.id]: [] }
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[payload.id]
            return newState
        }
        case 'delete_task': {
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].filter(task => task.id !== payload.taskId)
            }
        }
        case 'create_task': {
            const newTask = { id: payload.todolistId, title: payload.title, isDone: false }
            return {
                ...state,
                [payload.todolistId]: [ newTask, ...state[payload.todolistId] ]
            }
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return { type: 'delete_task', payload: { todolistId: payload.todolistId, taskId: payload.taskId } } as const
}

export const createTaskAC = (payload: { todolistId: string, title: string, }) => {
    return { type: 'create_task', payload: { todolistId: payload.todolistId, title: payload.title } } as const
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>

type Actions = CreateTodoListAction
    | DeleteTodoListAction
    | DeleteTaskAction
    | CreateTaskAction