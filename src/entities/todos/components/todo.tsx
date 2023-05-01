import React from 'react';
import {useDispatch} from 'react-redux';

import {addNewTask, deleteTask, setPriority, toggleTaskComplete} from '../store/todo';
import {EditTodoForm} from '@pages/todos/components';
import {ITodo} from '@shared/interfaces';
import TodoCard from './todoCard';
import useVisable from '@shared/hooks/useVisable';
import {deleteTodoById, postNewTodo, sendUpdatedTodo} from '@shared/api/services/todosService/fetchTodos';

interface Props {
    todo: ITodo
}

const Todo = ({todo}: Props) => {
  const {id} = todo;
  const dispatch = useDispatch();
  const [isEditing, openEditing, closeEditing] = useVisable(false);

  const onComplete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    sendUpdatedTodo({id, done: !todo.done})
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
    const newTodo = ({...todo, id: Date.now()})
    dispatch(addNewTask(newTodo));
    postNewTodo(newTodo).then((response) => console.log(response))
  };
  const setPriorityAction = (e: React.SyntheticEvent, priority: string) => {
    e.stopPropagation()
    const data = {id, priority}
    sendUpdatedTodo(data)
    dispatch(setPriority(data));
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
