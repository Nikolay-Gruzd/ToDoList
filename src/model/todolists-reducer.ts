import {TodoList} from "../App.tsx";
import {v1} from "uuid";

const initialState: TodoList[] = []

export const todolistsReducer = (state: TodoList[], action: Actions): TodoList[] => {
    const {type, payload} = action
    switch (type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== payload.id)
        }
        case 'create_todolist': {
            const newTodoList: TodoList = {id: payload.id, title: payload.title, filter: 'all'}
            // setTodoLists([...todoLists, newTodoList])
            // setTasks({[todoListId]: [], ...tasks})
            return [...state, newTodoList]
        }
        default:
            return state;
    }
}

export const deleteTodolistAC = (id: string) => {
    return { type: 'delete_todolist', payload: { id } } as const
}

export const createTodolistAC = (title: string) => {
    const id = v1()
    return { type: 'create_todolist', payload: { id, title } } as const
}

export type DeleteTodoListAction = ReturnType<typeof deleteTodolistAC> // автоматическая типизация для deleteTodolistAC
export type CreateTodoListAction = ReturnType<typeof createTodolistAC> // автоматическая типизация для createTodolistAC

type Actions =  DeleteTodoListAction | CreateTodoListAction