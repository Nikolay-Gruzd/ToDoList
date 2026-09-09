import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {FilterValues, TodoList} from "@/app/Main.tsx";
import {changeTodolistFilterAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {containerSx} from "@/common/styles/container.styles.ts";

type Props = {
    todoLists: TodoList;
}

export const FilterButtons = ({todoLists}: Props) => {
    const {id, filter} = todoLists

    const dispatch = useAppDispatch()

    const changeToDoListFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: id, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button color='inherit'
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeToDoListFilter("all")}
            >
                All
            </Button>
            <Button color='primary'
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeToDoListFilter("active")}
            >
                Active
            </Button>
            <Button color='secondary'
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeToDoListFilter("completed")}
            >
                Completed
            </Button>
        </Box>
    );
};