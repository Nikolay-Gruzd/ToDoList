import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

// export type FieldError = {
//   error: string
//   field: string
// }

export type BaseResponse<T = Todolist> = {
  data: T
}
