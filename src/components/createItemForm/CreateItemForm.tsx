import Button from "@mui/material/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' ? createItemHandler() : null
    }
    return (
        <div>
            <TextField label='Enter a title'
                       variant='outlined'
                       value={title}
                       size='small'
                       error={!!error}
                       helperText={error}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}
            />
            <Button variant='contained' onClick={createItemHandler}>+</Button>
        </div>
    );
};