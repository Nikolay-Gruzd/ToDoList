import {TodoList} from "../App.tsx";

const initialState: TodoList[] = []

export const todolistsReducer = (state: TodoList[], action: Actions): TodoList[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        default:
            return state;
    }
}

export type DeleteTodoListAction = {
    type: 'delete_todolist',
    payload: {
        id: string
    }
}

type Actions = DeleteTodoListAction