import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((todolists) => {
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((todolistTasks) => {
          setTasks((prev) => ({ ...prev, [todolist.id]: todolistTasks }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((newTodolist) => {
      setTodolists((prev) => [newTodolist, ...prev])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => setTodolists((prev) => prev.filter((todolist) => todolist.id !== id)))
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then((updatedTodolist) => {
      setTodolists((prev) => prev.map((todolist) => (todolist.id === id ? updatedTodolist : todolist)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((newTask) => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: [newTask, ...(prev[todolistId] ?? [])],
      }))
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: (prev[todolistId] ?? []).filter((task) => task.id !== taskId),
      }))
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const todolistId = task.todolistId
    const taskId = task.id

    const model: UpdateTaskModel = {
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
    }

    tasksApi.updateTask({ todolistId, taskId, model }).then((updatedTaskStatus) => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].map((el) => (el.id === taskId ? updatedTaskStatus : el)),
      }))
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todolistId
    const taskId = task.id

    const model: UpdateTaskModel = {
      title: title,
    }

    tasksApi.updateTask({ todolistId, taskId, model }).then((updatedTaskTitle) => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].map((el) => (el.id === taskId ? updatedTaskTitle : el)),
      }))
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
