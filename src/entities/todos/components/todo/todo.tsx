import React, {memo} from 'react';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import TodoCard from '../todoCard';
import * as todoActions from '@entities/todos/store/todoThunks';
import {useAppDispatch} from '@app/store';
import useTodos from '@entities/todos/hooks/useTodos';

interface Props {
    todo: ITodo,
  showProject?: boolean
}

const Todo = memo(({todo, showProject}: Props) => {
  const {id} = todo;
  const todoAPI = useTodos(id);
  const dispatch = useAppDispatch();

  const onDeleteAction = () => {
    dispatch(todoActions.deleteTaskThunk(id));
  };

  const onDuplicateAction = () => {
    const newTodo = ({...todo, id: Date.now()})
    dispatch(todoActions.duplicateTaskThunk(newTodo));
  };

  const setPriorityAction = (priority: Priority) => {
    const data = {id, priority}
    dispatch(todoActions.setPriorityTaskThunk(data))
  };

  return <TodoCard
    todo={todo}
    onDeleteAction={onDeleteAction}
    onDuplicateAction={onDuplicateAction}
    setPriorityAction={setPriorityAction}
    onComplete={todoAPI.onComplete}
    showProject={showProject}/>;
});

export default Todo;
