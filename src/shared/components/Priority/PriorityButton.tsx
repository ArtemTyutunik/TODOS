import React from 'react';
import {Button, SelectChangeEvent} from '@mui/material';
import {Priority} from '@shared/interfaces';
import PrioritySelect from '@shared/components/Priority/PrioritySelector';


const buttonsStyles = {
  color: '#7d7b74',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '11px',
  padding: 0,
};

interface Props {
  initialPriority?: Priority | string,
  changeHandler: (event: SelectChangeEvent<Priority>) => void,
  variant?: 'short' | 'standard'
}
const PriorityButton = ({initialPriority = '4', changeHandler, variant}: Props) => {
  return (
      variant === 'standard' ? (
        <Button sx={buttonsStyles} variant={'outlined'}>
          <PrioritySelect initialPriority={initialPriority} changeHandler={changeHandler}/>
        </Button>
      ) : (
            <PrioritySelect initialPriority={initialPriority} changeHandler={changeHandler}/>
      )
  );
};

export default PriorityButton;
