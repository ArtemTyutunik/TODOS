import React, {memo, useState} from 'react';
import {Box} from '@mui/material';

import Todo from '@entities/todos/components/todo';
import {ITodo} from '@shared/interfaces';
import CreateTodoForm from './createTodoForm';
import {TODAY} from '@shared/constants';
import AddTaskButton from './AddTaskButton';

interface Props {
    todos: ITodo[]
}

// eslint-disable-next-line react/display-name
const TodoList = memo(({todos}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const onClose = () => {
    setIsOpenForm(false);
  };

  const onOpenForm = () => {
    setIsOpenForm(true);
  };

  const form = isOpenForm ? (
          <Box mt={'20px'}>
            <CreateTodoForm onClose={onClose} initialDate={TODAY}/>
          </Box>
      ) : (
        <AddTaskButton onCreate={onOpenForm}/>
      )

  return (
    <Box mt={'20px'}>
      {
        todos.map((todo: ITodo) => <Todo todo = {todo} key={todo.id}/>)
      }
      {form}
    </Box>
  );
});

export default TodoList;
