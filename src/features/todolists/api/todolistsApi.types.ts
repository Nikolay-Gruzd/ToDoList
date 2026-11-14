// export type Todolist = {
//   id: string
//   title: string
//   addedDate: string
//   order: number
// }

export type Todolist = {
  id: string
  type: string
  attributes: {
    title: string
    description: string
    addedAt: string
    updatedAt: string
    order: number
    isImportant: boolean
    images: {
      main: [
        {
          type: string
          width: number
          height: number
          fileSize: number
          url: string
        },
      ]
    }
  }
}
