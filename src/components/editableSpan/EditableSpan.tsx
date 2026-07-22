import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    value: string,
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(value)

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const turnOnEditMode = () => {
        setIsEditMode(true)
    }
    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    return (
        <>
            {isEditMode ? (
                // <input value={title} onChange={changeTitleHandler} onBlur={turnOffEditMode} autoFocus/>
                <TextField variant='outlined'
                           value={title}
                           size='small'
                           onBlur={turnOffEditMode}
                           onChange={changeTitleHandler}
                           autoFocus
                />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
};