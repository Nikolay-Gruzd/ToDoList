import {Button} from "../button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={title}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}
                   className={error ? 'error' : ''}
            />
            <Button title="+" onClick={createItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};