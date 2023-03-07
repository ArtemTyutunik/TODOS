import React, {memo} from 'react';
import {Box} from '@mui/material';

import Todo from '@entities/todos/components/todo';
import {IDate, ITodo} from '@shared/interfaces';
import CreateTodoForm from './createTodoForm';
import AddTaskButton from './AddTaskButton';
import useVisable from '@shared/hooks/useVisable';

interface Props {
    todos: ITodo[],
    initialDate?: IDate
}

// eslint-disable-next-line react/display-name
const TodoList = memo(({todos, initialDate}: Props) => {
  const [isOpenForm, openForm, closeForm] = useVisable(false);

  const form = isOpenForm ? (
          <Box mt={'20px'}>
            <CreateTodoForm onClose={closeForm} initialDate={initialDate}/>
          </Box>
      ) : (
        <AddTaskButton onCreate={openForm}/>
      )

  return (
    <Box mt={'20px'} paddingBottom={'20px'}>
      {
        todos.map((todo: ITodo) => <Todo todo = {todo} key={todo.id}/>)
      }
      {form}
    </Box>
  );
});

export default TodoList;
