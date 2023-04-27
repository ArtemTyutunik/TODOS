import React from 'react';
import {useDispatch} from 'react-redux';

import BaseTodoForm from '@shared/forms/ui/baseTodoForm';
import {editTask} from '@entities/todos/store/todo';
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {IDate, ITodo, Priority, Label} from '@shared/interfaces';
import {sendUpdatedTodo} from '@shared/api/services/todosService/fetchTodos';

interface Props {
    onClose: () => void,
    todo: ITodo,
    hideActions?: boolean
}


const EditTodoForm = ({onClose, todo, hideActions}: Props) => {
  const dispatch = useDispatch();

  const onSubmit = (data: BaseFormInputs, date: IDate, priority: Priority | string | undefined, Label: Label) => {
    const updated = {...todo, ...data, date, priority, Label}
    dispatch(editTask(updated));
    sendUpdatedTodo(updated)
        .then((response) => console.log(response))
    onClose();
  };

  return <BaseTodoForm
    onClose={onClose}
    onSubmit={onSubmit}
    todo={todo}
    hideActions = {hideActions}/>;
};

export default EditTodoForm;
