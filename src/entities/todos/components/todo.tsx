import React from 'react';
import {useDispatch} from 'react-redux';

import {createDuplicate, deleteTask, setPriority, toggleTaskComplete} from '../store/todo';
import {EditTodoForm} from '@pages/todos/components';
import {ITodo} from '@shared/interfaces';
import TodoCard from './todoCard';
import useVisable from '@shared/hooks/useVisable';
import {deleteTodoById} from '@shared/api/services/fetchTodos';

interface Props {
    todo: ITodo
}

const Todo = ({todo}: Props) => {
  const {id} = todo;
  const dispatch = useDispatch();
  const [isEditing, openEditing, closeEditing] = useVisable(false);

  const onComplete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskComplete(Number(id)));
  };

  const onEdit = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    openEditing()
  };

  const onDeleteAction = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    dispatch(deleteTask(id));
    deleteTodoById(id)
  };
  const onDuplicateAction = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    dispatch(createDuplicate(id));
  };
  const setPriorityAction = (e: React.SyntheticEvent, priority: string) => {
    e.stopPropagation()
    dispatch(setPriority({id, priority}));
  };

  if (isEditing) return <EditTodoForm onClose={closeEditing} todo={todo}/>;

  return <TodoCard
    todo={todo}
    onDeleteAction={onDeleteAction}
    onDuplicateAction={onDuplicateAction}
    setPriorityAction={setPriorityAction}
    onComplete={onComplete}
    onEdit={onEdit}/>;
};

export default Todo;
