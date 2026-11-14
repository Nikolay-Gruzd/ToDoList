import { instance } from "@/common/instance"
import { Todolist } from "./todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<BaseResponse<Todolist[]>>("/boards/my")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse>("/boards", { title, description: "" })
  },
  deleteTodolist(id: string) {
    return instance.delete(`/boards/${id}`)
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/boards/${id}`, { title, isImportant: false })
  },
}
