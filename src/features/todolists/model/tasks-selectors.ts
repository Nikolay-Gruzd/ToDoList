import {RootState} from "../../../app/store.ts";
import {TasksState} from "@/app/Main.tsx";

export const selectTasks = (state: RootState): TasksState => state.tasks