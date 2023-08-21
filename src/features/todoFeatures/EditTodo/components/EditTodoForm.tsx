import React from 'react';
import {useAppDispatch} from '@app/store';

import BaseTodoForm from '@features/todoFeatures/components/baseTodoForm';
import {ITodo} from '@shared/interfacesAndTypes';
import {editTaskThunk} from '@entities/todos/store/todoThunks';


interface Props {
    onClose: () => void,
    todo: ITodo,
    hideActions?: boolean,
}

const EditTodoForm = ({onClose, todo, hideActions}: Props) => {
  const dispatch = useAppDispatch();

  const onSubmit = (newTodo: ITodo) => {
    const updatedTodo = {...todo, ...newTodo}
    dispatch(editTaskThunk({updatedTodo, showNotification: true}));
    onClose();
  };

  return <BaseTodoForm
    onClose={onClose}
    onSubmit={onSubmit}
    todo={todo}
    hideActions = {hideActions}
    todoProjectId={todo.projectId}
  />;
};

export default EditTodoForm;
