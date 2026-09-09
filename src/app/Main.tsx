import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTodolistAC} from "@/model/todolists-reducer.ts";
import {Todolists} from "@/features/todolists/ui/TodoLists/Todolists.tsx";

// Types //

export type FilterValues = "all" | "active" | "completed"

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TasksState = Record<string, Task[]>  // { [key: string]: Task[] }

export type TodoList = {
    id: string
    title: string
    filter: FilterValues
}

export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};