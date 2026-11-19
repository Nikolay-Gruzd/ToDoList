export type TodolistAttributes = {
  title: string
  addedAt: string
  order: number
}

export type Todolist = { id: string } & TodolistAttributes
