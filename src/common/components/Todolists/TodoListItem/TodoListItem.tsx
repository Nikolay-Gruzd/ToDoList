import {TodoList} from "@/app/Main.tsx";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodoListTitle} from "@/common/components/Todolists/TodoListItem/TodoListTitle/TodoListTitle.tsx";
import {Tasks} from "@/common/components/Todolists/TodoListItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/common/components/Todolists/TodoListItem/FilterButtons/FilterButtons.tsx";


type Props = {
    todoLists: TodoList,
}

export const TodoListItem = ({ todoLists }: Props) => {

    const {id} = todoLists;

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todoListId: id, title}))
    }

    return (
        <div>
            <TodoListTitle todoLists={todoLists}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todoLists={todoLists}/>
            <FilterButtons todoLists={todoLists}/>
        </div>
    )
}