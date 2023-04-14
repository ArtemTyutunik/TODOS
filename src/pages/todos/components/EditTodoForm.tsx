import React from 'react';
import {useDispatch} from 'react-redux';

import BaseTodoForm from '@shared/forms/ui/baseTodoForm';
import {editTask} from '@entities/todos/store/todo';
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {IDate, ITodo, Priority, Label} from '@shared/interfaces';

interface Props {
    onClose: () => void,
    todo: ITodo,
    hideActions?: boolean
}


const EditTodoForm = ({onClose, todo, hideActions}: Props) => {
  const dispatch = useDispatch();

  const onSubmit = (data:BaseFormInputs, date: IDate, priority: Priority | string | undefined, Label: Label) => {
    dispatch(editTask({...todo, ...data, date, priority, Label}));
    onClose();
  };

  return <BaseTodoForm
    onClose={onClose}
    onSubmit={onSubmit}
    todo={todo}
    hideActions = {hideActions}/>;
};

export default EditTodoForm;
