import { instance } from "@/common/instance"
import {
  DomainTask,
  GetTasksResponse,
  TaskAttributes,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts"
import { ApiResource, BaseResponse } from "@/common/types"

const toDomainTask = ({ id, attributes }: ApiResource<TaskAttributes>, todolistId: string): DomainTask => ({
  id,
  ...attributes,
  todolistId,
})

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance
      .get<GetTasksResponse>(`/boards/${todolistId}/tasks`)
      .then((res) => res.data.data.map((task) => toDomainTask(task, todolistId)))
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance
      .post<BaseResponse<ApiResource<TaskAttributes>>>(`/boards/${todolistId}/tasks`, {
        data: { type: "tasks", attributes: { title } },
      })
      .then((res) => toDomainTask(res.data.data, todolistId))
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance
      .patch<BaseResponse<ApiResource<TaskAttributes>>>(`/boards/${todolistId}/tasks/${taskId}`, {
        data: { type: "tasks", attributes: model },
      })
      .then((res) => toDomainTask(res.data.data, todolistId))
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete(`/boards/${todolistId}/tasks/${taskId}`)
  },
}
