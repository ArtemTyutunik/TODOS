import React, {memo} from 'react';
import {Box} from '@mui/material';

import {EditTodoForm} from '@features/todoFeatures/EditTodo';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import TodoCard from '../todoCard';
import {useVisable} from '@shared/hooks';
import * as todoActions from '@entities/todos/store/todoThunks';
import {useAppDispatch} from '@app/store';

interface Props {
    todo: ITodo,
  showProject?: boolean
}

const Todo = memo(({todo, showProject}: Props) => {
  const {id} = todo;
  const dispatch = useAppDispatch();
  const [isEditing, openEditing, closeEditing] = useVisable(false);

  const onComplete = () => {
    dispatch(todoActions.completeTaskThunk({id, done: !todo.done}));
  };

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

  if (isEditing) {
    return <Box width={'100%'}>
      <EditTodoForm onClose={closeEditing} todo={todo}/>
    </Box>
  }

  return <TodoCard
    todo={todo}
    onDeleteAction={onDeleteAction}
    onDuplicateAction={onDuplicateAction}
    setPriorityAction={setPriorityAction}
    onComplete={onComplete}
    onEdit={openEditing}
    showProject={showProject}/>;
});

export default Todo;
