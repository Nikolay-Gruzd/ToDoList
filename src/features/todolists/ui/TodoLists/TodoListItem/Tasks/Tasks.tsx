import { useAppSelector } from "@/common/hooks"
import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/TodoLists/TodoListItem/Tasks/TaskItem/TaskItem.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  todoLists: DomainTodolist
}

export const Tasks = ({ todoLists }: Props) => {
  const { id, filter } = todoLists

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks?.filter((task) => !task.isDone)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks?.filter((task) => task.isDone)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todoListId={id} />
          ))}
        </List>
      )}
    </>
  )
}
