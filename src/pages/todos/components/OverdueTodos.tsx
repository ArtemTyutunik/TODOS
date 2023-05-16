import React from 'react';
import {ITodo} from '@shared/interfaces';
import {Box, Typography, useTheme} from '@mui/material';
import RenderedList from '@entities/todos/components/RenderedList';

interface Props {
    overdueTodos: ITodo[]
}
const OverdueTodos = ({overdueTodos} : Props) => {
  const theme = useTheme()
  return (
        overdueTodos.length ? (
            <Box mb={'40px'}>
              <Typography fontSize={'16px'} fontWeight={'700'} color={theme.text.title}>
                    Overdue
              </Typography>
              <RenderedList todos={overdueTodos}/>
            </Box>
        ) : null
  );
};

export default OverdueTodos;
