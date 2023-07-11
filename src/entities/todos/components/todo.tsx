import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addNewTask, deleteTask, setPriority, toggleTaskComplete} from '../store/todo';
import {EditTodoForm} from '@features/todoFeatures/EditTodo';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import TodoCard from './todoCard';
import {useVisable} from '@shared/hooks';
import {deleteTodoById, postNewTodo, sendUpdatedTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';
import {Box} from '@mui/material';

interface Props {
    todo: ITodo
}

const Todo = memo(({todo}: Props) => {
  const {id} = todo;
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector)
  const [isEditing, openEditing, closeEditing] = useVisable(false);

  const onComplete = () => {
    try {
      sendUpdatedTodo({id, done: !todo.done}, userId)
      dispatch(toggleTaskComplete(Number(id)));
    } catch (e) {
      console.log(e)
    }
  };

  const onDeleteAction = () => {
    try {
      deleteTodoById(id, userId)
      dispatch(deleteTask(id));
    } catch (e) {
      console.log(e)
    }
  };
  const onDuplicateAction = () => {
    const newTodo = ({...todo, id: Date.now()})
    dispatch(addNewTask(newTodo));
    try {
      postNewTodo(newTodo, userId)
    } catch (e) {
      console.log(e)
    }
  };
  const setPriorityAction = (priority: Priority) => {
    try {
      const data = {id, priority}
      sendUpdatedTodo(data, userId)
      dispatch(setPriority(data));
    } catch (e) {
      console.log(e)
    }
  };

  if (isEditing) {
    return <Box width={'100%'}>
      <EditTodoForm onClose={closeEditing} todo={todo}/>;
    </Box>
  }

  return <TodoCard
    todo={todo}
    onDeleteAction={onDeleteAction}
    onDuplicateAction={onDuplicateAction}
    setPriorityAction={setPriorityAction}
    onComplete={onComplete}
    onEdit={openEditing}/>;
});

export default Todo;
