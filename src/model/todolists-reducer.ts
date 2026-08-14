import {FilterValues, TodoList} from "../app/App.tsx";
import {v1} from "uuid";

// const initialState: TodoList[] = []

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
        case 'change_todolist_title': {
            return state.map(t => t.id === payload.id ? {...t, title: payload.title} : t)
        }
        case 'change_todolist_filter': {
            return state.map(t => t.id === payload.id ? {...t, filter: payload.filter} : t)
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

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return { type: 'change_todolist_title', payload: { id: payload.id, title: payload.title } } as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
    return { type: 'change_todolist_filter', payload: { id: payload.id, filter: payload.filter } } as const
}

export type DeleteTodoListAction = ReturnType<typeof deleteTodolistAC> // автоматическая типизация для deleteTodolistAC
export type CreateTodoListAction = ReturnType<typeof createTodolistAC> // автоматическая типизация для createTodolistAC
export type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC> // автоматическая типизация для changeTodolistTitleAC
export type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC> // автоматическая типизация для changeTodolistTitleAC

type Actions =
    DeleteTodoListAction
    | CreateTodoListAction
    | ChangeTodolistTitleAC
    | ChangeTodolistFilterAC
