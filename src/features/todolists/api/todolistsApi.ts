import { instance } from "@/common/instance"
import { CreateTodolistResponse, GetTodolistsResponse, UpdateTodolistResponse } from "./todolistsApi.types.ts"

export const todolistsApi = {
  getTodolists() {
    return instance.get<GetTodolistsResponse>("/boards/my")
  },
  createTodolist(title: string) {
    return instance.post<CreateTodolistResponse>("/boards", { title, description: "" })
  },
  deleteTodolist(id: string) {
    return instance.delete(`/boards/${id}`)
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<UpdateTodolistResponse>(`/boards/${id}`, { title, isImportant: false })
  },
}
