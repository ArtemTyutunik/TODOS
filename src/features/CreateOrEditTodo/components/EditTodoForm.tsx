import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BaseTodoForm from '@shared/forms/ui/baseTodoForm';
import {editTask} from '@entities/todos/store/todo';
import {ITodo} from '@shared/interfacesAndTypes';
import {sendUpdatedTodo} from '@shared/api/services/todosService/fetchTodos';
import {userIdSelector} from '@pages/authorization/store';
import {toast} from 'react-toastify';
import {options} from '@shared/components/Notification/constants';
import TodoEditedNotification from '@shared/components/Notification/TodoEdited';

interface Props {
    onClose: () => void,
    todo: ITodo,
    hideActions?: boolean
}

const notify = () => {
  toast(<TodoEditedNotification/>, options);
}

const EditTodoForm = ({onClose, todo, hideActions}: Props) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector)

  const onSubmit = (newTodo: ITodo) => {
    const updated = {...todo, ...newTodo}
    dispatch(editTask(updated));
    sendUpdatedTodo(updated, userId)
        .then(notify)
    onClose();
  };

  return <BaseTodoForm
    onClose={onClose}
    onSubmit={onSubmit}
    todo={todo}
    hideActions = {hideActions}/>;
};

export default EditTodoForm;
