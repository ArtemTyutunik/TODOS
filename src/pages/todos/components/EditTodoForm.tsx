import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BaseTodoForm from '@shared/forms/ui/baseTodoForm';
import {editTask} from '@entities/todos/store/todo';
import {ITodo} from '@shared/interfaces';
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

  const onSubmit = (newTodo: ITodo) => {
    const updated = {...todo, ...newTodo}
    dispatch(editTask(updated));
    sendUpdatedTodo(updated, userId)
    onClose();
  };

  return <BaseTodoForm
    onClose={onClose}
    onSubmit={onSubmit}
    todo={todo}
    hideActions = {hideActions}/>;
};

export default EditTodoForm;
