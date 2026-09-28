import {instance} from "@/common/instance/instance.ts";
import {Todolist} from "./todolistsApi.types.ts";

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('/todo-lists')
    },
}