import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";

import {createDuplicate, deleteTask, setPriority, toggleTaskComplete} from "../model/todo";
import EditTodoForm from "../../../pages/todos/ui/EditTodoForm";
import {ITodo} from "../../../shared/interfaces";
import TodoCard from "./todoCard";

interface TodoProps {
    todo: ITodo
}


const  Todo:FC<TodoProps> = ({todo})  => {
    const {id} = todo
    const dispatch  = useDispatch()
    const [isEditing, setIsEditing] = useState(false)

    const onCloseEditForm = () => {
        setIsEditing(false)
    }

    const onComplete = () => {
        dispatch(toggleTaskComplete(id))
    }

    const onEdit = () => {
        setIsEditing(true)
    }

    const onDeleteAction = () => {
        dispatch(deleteTask(id))
    }
    const onDuplicateAction = () => {
        dispatch(createDuplicate(id))
    }
    const setPriorityAction = (priority: string) => {
        dispatch(setPriority({id, priority}))
    }

    if (isEditing) return <EditTodoForm onClose={() => onCloseEditForm()} todo={todo}/>

    return <TodoCard todo={todo}
                     onDeleteAction={onDeleteAction}
                     onDuplicateAction={onDuplicateAction}
                     setPriorityAction={setPriorityAction}
                     onComplete={onComplete}
                     onEdit={onEdit}/>

}

export default Todo;