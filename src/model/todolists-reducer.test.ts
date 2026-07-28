import {expect, test} from 'vitest'
import {v1} from "uuid";
import {TodoList} from "../App.tsx";
import {todolistsReducer} from "./todolists-reducer.ts";

test('correct todolist should be deleted', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TodoList[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'delete_todolist',
        payload: {
            id: todoListId1,
        }
    }

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})