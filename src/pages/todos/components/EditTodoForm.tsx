import React from "react";
import {useDispatch} from "react-redux";

import BaseTodoForm from "../../../shared/forms/ui/baseTodoForm";
import {editTask} from "../../../entities/todos/store/todo";
import {IBaseFormInputsValues} from "../../../shared/forms/interfaces/interfaces";
import {ITodo} from "../../../shared/interfaces";

interface Props {
    onClose: () => void,
    todo: ITodo
}


const EditTodoForm = ({onClose,todo}: Props) => {
    const dispatch  = useDispatch();

    const onSubmit = (data:IBaseFormInputsValues) => {
        dispatch(editTask({...todo, ...data}))
        onClose()
    }

    return <BaseTodoForm onClose={onClose} onSubmit={onSubmit} todo={todo}/>
}

export default EditTodoForm;