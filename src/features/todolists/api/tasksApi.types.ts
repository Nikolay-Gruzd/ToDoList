// export type DomainTask = {
//   id: string
//   type: string
//   attributes: {
//     title: string
//     addedAt: string
//     order: number
//     status: TaskStatus
//     priority: TaskPriority
//     startDate: string
//     deadline: string
//     updatedAt: string
//     attachments: [
//       {
//         id: string
//         url: string
//         contentType: string
//         originalName: string
//         fileSize: number
//         isImage: true
//         addedAt: string
//         images: [
//           {
//             type: string
//             width: number
//             height: number
//             fileSize: number
//             url: string
//           },
//         ]
//       },
//     ]
//   }
//   relationships: {
//     board: {
//       data: {
//         id: string
//         type: string
//       }
//     }
//   }
// }
//
// export type GetTasksResponse = {
//   data: DomainTask[]
//   included: [
//     {
//       id: string
//       type: string
//       attributes: {
//         title: string
//       }
//     },
//   ]
//   meta: {
//     page: number
//     pageSize: number
//     totalCount: number
//     pagesCount: number
//   }
// }

import { ApiResource, BaseResponse } from "@/common/types"
import { TaskPriority, TaskStatus } from "@/common/enums"

export type UpdateTaskModel = {
  title?: string
  description?: string | null
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string | null
  deadline?: string | null
}

export type TaskAttributes = {
  title: string
  addedAt: string
  order: number
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  updatedAt: string
}

export type DomainTask = { id: string; todolistId: string } & TaskAttributes

export type GetTasksResponse = BaseResponse<ApiResource<TaskAttributes>[]>
