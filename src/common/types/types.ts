// import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

// export type FieldError = {
//   error: string
//   field: string
// }

export type BaseResponse<T> = {
  data: T
}

export type ApiResource<A> = {
  id: string
  type: string
  attributes: A
}
