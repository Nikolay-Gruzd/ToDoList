import {RootState} from "../app/store.ts";
import {TodoList} from "../app/App.tsx";

export const selectTodolists = (state: RootState): TodoList[] => state.todolists