import React, {memo, useState} from 'react';
import {Box} from '@mui/material';

import Todo from '@entities/todos/components/todo';
import {IDate, ITodo} from '@shared/interfaces';
import CreateTodoForm from './createTodoForm';
import AddTaskButton from './AddTaskButton';

interface Props {
    todos: ITodo[],
    initialDate?: IDate
}

// eslint-disable-next-line react/display-name
const TodoList = memo(({todos, initialDate}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const onClose = () => {
    setIsOpenForm(false);
  };

  const onOpenForm = () => {
    setIsOpenForm(true);
  };

  const form = isOpenForm ? (
          <Box mt={'20px'}>
            <CreateTodoForm onClose={onClose} initialDate={initialDate}/>
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
