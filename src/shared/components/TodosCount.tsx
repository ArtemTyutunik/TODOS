import React from 'react';
import {Typography} from '@mui/material';

const TodosCount = ({children}: {children: React.ReactNode}) => {
  return (
    <Typography color={'#aaa'} fontSize={'13px'} data-testid={'custom'}>
      {children}
    </Typography>
  );
};

export default TodosCount;
