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

export const deleteTodolistAC = (id: string) => {
    return { type: 'delete_todolist', payload: { id } } as const
}

export type DeleteTodoListAction = ReturnType<typeof deleteTodolistAC> // автоматическая типизация для deleteTodolistAC

type Actions = DeleteTodoListAction