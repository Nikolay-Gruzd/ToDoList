import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoListItem} from "@/features/todolists/ui/TodoLists/TodoListItem/TodoListItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";

export const Todolists = () => {

    const todoLists = useAppSelector(selectTodolists)

    return (
        <>
            {todoLists.map(todoLists => {
                return (
                    <Grid key={todoLists.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodoListItem todoLists={todoLists} />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};