import {FilterValues, TodoList} from "@/app/Main.tsx";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box'
import {containerSx} from "./TodolistItem.styles.ts";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC} from "@/model/todolists-reducer.ts";
import {TodoListTitle} from "@/common/components/TodoListItem/TodoListTitle/TodoListTitle.tsx";
import {Tasks} from "@/common/components/TodoListItem/Tasks/Tasks.tsx";


type Props = {
    todoLists: TodoList,
}

export const TodoListItem = ({ todoLists }: Props) => {

    const {id, filter} = todoLists;

    const dispatch = useAppDispatch()

        const changeToDoListFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: id, filter}))
    }
    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todoListId: id, title}))
    }

    return (
        <div>
            <TodoListTitle todoLists={todoLists}/>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            <Tasks todoLists={todoLists}/>

            <Box sx={containerSx}>
                <Button color='inherit'
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => changeToDoListFilter("all")}
                >
                    All
                </Button>
                <Button color='primary'
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeToDoListFilter("active")}
                >
                    Active
                </Button>
                <Button color='secondary'
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeToDoListFilter("completed")}
                >
                    Completed
                </Button>
            </Box>
        </div>
    )
}