import {Button} from "../button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    onCreateItem: (taskTitle: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' ? createTaskHandler() : null
    }
    return (
        <div>
            <input value={title}
                   onChange={changeTaskTitleHandler}
                   onKeyDown={createTaskOnEnterHandler}
                   className={error ? 'error' : ''}
            />
            <Button title="+" onClick={createTaskHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};