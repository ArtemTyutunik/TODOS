import React, {memo, useState} from 'react';
import {Box, Typography} from '@mui/material';

import Todo from '../../../entities/todos/components/todo';
import {ITodo} from '../../../shared/interfaces';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CreateTodoForm from './createTodoForm';

interface Props {
    todos: ITodo[]
}

const boxStyles = {
  'display': 'flex',
  'alignItems': 'center',
  'marginTop': '20px',
  'color': '#515761',
  'cursor': 'pointer',

  '&:hover': {
    color: '#1976d2',
  },
};


// eslint-disable-next-line react/display-name
const TodoList = memo(({todos}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const onClose = () => {
    setIsOpenForm(false);
  };

  const onOpenForm = () => {
    setIsOpenForm(true);
  };

  const form = isOpenForm ? <Box mt={'20px'}><CreateTodoForm onClose={onClose}/></Box> : <div hidden></div>

  return (
    <Box mt={'20px'}>
      {
        todos.map((todo: ITodo) => <Todo todo = {todo} key={todo.id}/>)
      }
      <Box sx = {boxStyles} onClick={onOpenForm}>
        <AddTaskIcon sx ={{color: '#1976d2'}}/>
        <Typography ml={'10px'} color={'inherit'} fontSize={'15px'} fontWeight={300}>
                Add task
        </Typography>
      </Box>
      {form}
    </Box>
  );
});

export default TodoList;
