import { instance } from "@/common/instance"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get(`/todo-lists/${todolistId}/tasks`)
  },
}
