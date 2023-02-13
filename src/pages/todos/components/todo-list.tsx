import {memo} from 'react';
import {Box} from '@mui/material';

import Todo from '../../../entities/todos/components/todo';
import {ITodo} from '../../../shared/interfaces';

interface Props {
    todos: ITodo[]
}

// eslint-disable-next-line react/display-name
const TodoList = memo(({todos}: Props) => {
  return (
    <Box mt={'20px'}>
      {
        todos.map((todo: ITodo) => <Todo todo = {todo} key={todo.id}/>)
      }
    </Box>
  );
});

export default TodoList;
