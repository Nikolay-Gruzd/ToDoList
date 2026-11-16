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
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data.data.map(({ id, attributes }) => ({ id, ...attributes }))
      setTodolists(todolists)
      // todolists.forEach((todolist) => {
      //   tasksApi.getTasks(todolist.id).then((res) => {
      //     const tasks = res.data.data
      //     setTasks((prev) => ({
      //       ...prev,
      //       [todolist.id]: tasks,
      //     }))
      //   })
      // })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const { id, attributes } = res.data.data
      const newTodolist = { id, ...attributes }
      setTodolists((prev) => [newTodolist, ...prev])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => setTodolists((prev) => prev.filter((todolist) => todolist.id !== id)))
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then((res) => {
      const { id, attributes } = res.data.data
      const updatedTodolist = { id, ...attributes }
      setTodolists((prev) => prev.map((todolist) => (todolist.id === id ? updatedTodolist : todolist)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      const newTask = res.data.data
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

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, todolistId: string, task: DomainTask) => {
    const taskId = task.id

    const model: UpdateTaskModel = {
      data: {
        type: task.type,
        attributes: {
          title: task.attributes.title,
          description: "",
          status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
          priority: task.attributes.priority,
          startDate: task.attributes.startDate,
          deadline: task.attributes.deadline,
        },
      },
    }

    tasksApi.updateTask({ todolistId, taskId, model }).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].map((el) => (el.id === taskId ? res.data.data : el)),
      }))
    })
  }

  const changeTaskTitle = (task: DomainTask, todolistId: string, title: string) => {
    const taskId = task.id

    const model: UpdateTaskModel = {
      data: {
        type: task.type,
        attributes: {
          title: title,
          description: "",
          status: task.attributes.status,
          priority: task.attributes.priority,
          startDate: task.attributes.startDate,
          deadline: task.attributes.deadline,
        },
      },
    }

    tasksApi.updateTask({ todolistId, taskId, model }).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].map((el) => (el.id === taskId ? res.data.data : el)),
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
              <Checkbox
                checked={task.attributes.status === TaskStatus.Completed}
                onChange={(e) => changeTaskStatus(e, todolist.id, task)}
              />
              <EditableSpan
                value={task.attributes.title}
                onChange={(title) => changeTaskTitle(task, todolist.id, title)}
              />
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
