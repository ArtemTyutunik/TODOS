import React, {FC} from 'react';
import {useDispatch} from "react-redux";

import BaseTodoForm from "../../../shared/forms/ui/baseTodoForm";
import {addNewTask} from "../../../entities/todos/model/todo";
import {IBaseFormInputsValues} from "../../../shared/forms/interfaces/interfaces";


interface ICreateTodoFormProps {
    onClose: () => void
}


const CreateTodoForm:FC<ICreateTodoFormProps> = ({onClose}) => {
    const dispatch = useDispatch()

    const onSubmit = (data:IBaseFormInputsValues) => {
        dispatch(addNewTask({...data, id: Date.now(), done: false}))
        onClose()
    }

    return <BaseTodoForm onClose={onClose} onSubmit={onSubmit}/>
}


export default CreateTodoForm;
