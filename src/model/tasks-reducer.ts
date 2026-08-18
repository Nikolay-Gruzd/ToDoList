import type {TasksState} from '../app/App.tsx'
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{todoListId: string, taskId: string}>('tasks/deleteTask')
export const createTaskAC = createAction('tasks/createTask', (payload: {todoListId: string, title: string}) => {
    return {payload: {todoListId: payload.todoListId, taskId: nanoid(), title: payload.title}}
})
export const changeTaskStatusAC = createAction<{todoListId: string, taskId: string, isDone: boolean}>(
    'tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todoListId: string, taskId: string, title: string}>(
    'tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todoListId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todoListId].unshift(
                {id: action.payload.taskId, title: action.payload.title, isDone: false}
            )
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todoListId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todoListId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})