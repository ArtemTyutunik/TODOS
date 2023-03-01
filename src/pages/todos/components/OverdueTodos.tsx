import React from 'react';
import {ITodo} from '@shared/interfaces';
import TodoList from './todo-list';
import {Box, Typography} from '@mui/material';

interface Props {
    overdueTodos: ITodo[]
}
const OverdueTodos = ({overdueTodos} : Props) => {
  return (
        overdueTodos.length ? (
            <Box mb={'40px'}>
              <Typography fontSize={'16px'} fontWeight={'700'} color={'#202020'}>
                    Overdue
              </Typography>
              <TodoList todos={overdueTodos}/>
            </Box>
        ) : null
  );
};

export default OverdueTodos;
