import React from 'react';
import {useDispatch} from 'react-redux';

import BaseTodoForm from '../../../shared/forms/ui/baseTodoForm';
import {editTask} from '../../../entities/todos/store/todo';
import {IBaseFormInputsValues} from '../../../shared/forms/interfaces/interfaces';
import {IDate, ITodo} from '../../../shared/interfaces';

interface Props {
    onClose: () => void,
    todo: ITodo,
    hideActions?: boolean
}


const EditTodoForm = ({onClose, todo, hideActions}: Props) => {
  const dispatch = useDispatch();

  const onSubmit = (data:IBaseFormInputsValues, date: IDate) => {
    dispatch(editTask({...todo, ...data, date}));
    onClose();
  };

  return <BaseTodoForm
    onClose={onClose}
    onSubmit={onSubmit}
    todo={todo}
    hideActions = {hideActions}/>;
};

export default EditTodoForm;
