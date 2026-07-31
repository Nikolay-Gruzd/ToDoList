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
        default:
            return state
    }
}


type Actions = CreateTodoListAction
    | DeleteTodoListAction