import {TodoList} from "../App.tsx";

const initialState: TodoList[] = []

export const todolistsReducer = (state: TodoList[], action: Actions): TodoList[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state
        }
        default:
            return state;
    }
}

type Actions = {
    type: string,
    payload: any
}