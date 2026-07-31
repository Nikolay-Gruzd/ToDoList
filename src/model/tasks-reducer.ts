import type { TasksState } from '../App'
import {CreateTodoListAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    const {type, payload} = action
    switch (type) {
        case 'create_todolist': {
            return { ...state, [action.payload.id]: [] }
        }
        default:
            return state
    }
}



type Actions = CreateTodoListAction