import React from 'react';
import {Typography} from '@mui/material';
import {AddIcon} from '@shared/components/icons';

const TodosCount = ({children}: {children: React.ReactNode}) => {
  return (
    <Typography color={'#aaa'} fontSize={'13px'} data-testid={'custom'}>
      {children}
      <AddIcon/>
    </Typography>
  );
};

export default TodosCount;
