import { instance } from "@/common/instance"
import { ApiResource, BaseResponse } from "@/common/types"
import { Todolist, TodolistAttributes } from "@/features/todolists/api/todolistsApi.types.ts"

const toTodolist = ({ id, attributes }: ApiResource<TodolistAttributes>): Todolist => ({
  id,
  ...attributes,
})

export const todolistsApi = {
  getTodolists() {
    return instance
      .get<BaseResponse<ApiResource<TodolistAttributes>[]>>("/boards/my")
      .then((res) => res.data.data.map(toTodolist))
  },
  createTodolist(title: string) {
    return instance
      .post<BaseResponse<ApiResource<TodolistAttributes>>>("/boards", {
        data: { type: "boards", attributes: { title } },
      })
      .then((res) => toTodolist(res.data.data))
  },
  deleteTodolist(id: string) {
    return instance.delete(`/boards/${id}`)
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance
      .patch<BaseResponse<ApiResource<TodolistAttributes>>>(`/boards/${id}`, {
        data: { type: "boards", attributes: { title } },
      })
      .then((res) => toTodolist(res.data.data))
  },
}
