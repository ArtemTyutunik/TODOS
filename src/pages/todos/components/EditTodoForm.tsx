import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BaseTodoForm from '@shared/forms/ui/baseTodoForm';
import {editTask} from '@entities/todos/store/todo';
import {BaseFormInputs} from '@shared/forms/interfaces/interfaces';
import {IDate, ITodo, Priority} from '@shared/interfaces';
import {sendUpdatedTodo} from '@shared/api/services/todosService/fetchTodos';
import {userIdSelector} from '@pages/authorization/store';

interface Props {
    onClose: () => void,
    todo: ITodo,
    hideActions?: boolean
}


const EditTodoForm = ({onClose, todo, hideActions}: Props) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector)

  const onSubmit = (data: BaseFormInputs, date: IDate, priority: Priority | string | undefined) => {
    const updated = {...todo, ...data, date, priority}
    dispatch(editTask(updated));
    sendUpdatedTodo(updated, userId)
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
