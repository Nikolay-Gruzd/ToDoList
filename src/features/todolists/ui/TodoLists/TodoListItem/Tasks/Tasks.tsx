import {useAppSelector} from "@/common/hooks";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import List from "@mui/material/List";
import {TodoList} from "@/app/Main.tsx";
import {TaskItem} from "@/features/todolists/ui/TodoLists/TodoListItem/Tasks/TaskItem/TaskItem.tsx";

type Props = {
    todoLists : TodoList
}

export const Tasks = ({todoLists}: Props) => {
    const {id, filter} = todoLists

    const tasks = useAppSelector(selectTasks);

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => <TaskItem key={task.id} task={task} todoListId={id} />)}
                </List>
            ) }
        </>
    );
};