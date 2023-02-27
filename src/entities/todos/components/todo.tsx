import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {createDuplicate, deleteTask, setPriority, toggleTaskComplete} from '../store/todo';
import EditTodoForm from '@pages/todos/components/EditTodoForm';
import {ITodo} from '@shared/interfaces';
import TodoCard from './todoCard';

interface Props {
    todo: ITodo
}

const Todo = ({todo}: Props) => {
  const {id} = todo;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const onCloseEditForm = () => {
    setIsEditing(false);
  };

  const onComplete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskComplete(Number(id)));
  };

  const onEdit = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setIsEditing(true);
  };

  const onDeleteAction = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    dispatch(deleteTask(id));
  };
  const onDuplicateAction = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    dispatch(createDuplicate(id));
  };
  const setPriorityAction = (e: React.SyntheticEvent, priority: string) => {
    e.stopPropagation()
    dispatch(setPriority({id, priority}));
  };

  if (isEditing) return <EditTodoForm onClose={onCloseEditForm} todo={todo}/>;

  return <TodoCard
    todo={todo}
    onDeleteAction={onDeleteAction}
    onDuplicateAction={onDuplicateAction}
    setPriorityAction={setPriorityAction}
    onComplete={onComplete}
    onEdit={onEdit}/>;
};

export default Todo;
