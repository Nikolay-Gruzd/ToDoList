export type BaseResponse<T> = {
  data: T
}

export type ApiResource<A> = {
  id: string
  type: string
  attributes: A
}
