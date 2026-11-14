import { TaskPriority, TaskStatus } from "@/common/enums"

// export type GetTasksResponse = {
//   error: string | null
//   totalCount: number
//   items: DomainTask[]
// }
//
// export type DomainTask = {
//   description: string
//   title: string
//   status: TaskStatus
//   priority: TaskPriority
//   startDate: string
//   deadline: string
//   id: string
//   todoListId: string
//   order: number
//   addedDate: string
// }

// export type UpdateTaskModel = {
//   description: string
//   title: string
//   status: TaskStatus
//   priority: TaskPriority
//   startDate: string
//   deadline: string
// }

export type UpdateTaskModel = {
  data: {
    type: string
    attributes: {
      title: string
      description: string
      status: TaskStatus
      priority: TaskPriority
      startDate: string
      deadline: string
    }
  }
}

export type DomainTask = {
  id: string
  type: string
  attributes: {
    title: string
    addedAt: string
    order: number
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    updatedAt: string
    attachments: [
      {
        id: string
        url: string
        contentType: string
        originalName: string
        fileSize: number
        isImage: true
        addedAt: string
        images: [
          {
            type: string
            width: number
            height: number
            fileSize: number
            url: string
          },
        ]
      },
    ]
  }
  relationships: {
    board: {
      data: {
        id: string
        type: string
      }
    }
  }
}

export type GetTasksResponse = {
  data: DomainTask[]
  included: [
    {
      id: string
      type: string
      attributes: {
        title: string
      }
    },
  ]
  meta: {
    page: number
    pageSize: number
    totalCount: number
    pagesCount: number
  }
}
