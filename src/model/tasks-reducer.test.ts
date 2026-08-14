import {beforeEach, expect, test} from 'vitest'
import type {TasksState} from '../app/App.tsx'
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "./tasks-reducer.ts";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({todoListId: 'todolistId2', taskId: '2'})
    )

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})

test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC({
            todoListId: 'todolistId2',
            title: 'juice',
        })
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('juice')
    expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should be change its status', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({todoListId: 'todolistId2', taskId: '2', isDone: false})
    )

    expect(endState.todolistId2[1].id).toBe('2')
    expect(endState.todolistId2[1].isDone).toBe(false)
})

test('correct task should be change its title', () => {
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({todoListId: 'todolistId2', taskId: '2', title: 'miiiiiiilk'})
    )

    expect(endState.todolistId2[1].id).toBe('2')
    expect(endState.todolistId2[1].title).toBe('miiiiiiilk')
})