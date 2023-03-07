import React from 'react';
import {Button} from '@mui/material';

const buttonsStyles = {
  color: '#7d7b74',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  boxShadow: 'none',
  textTransform: 'none',
  padding: '0 8px',
  fontSize: '11px',
};

interface Props {
    children: React.ReactNode
    onClickHandler?: (event: React.MouseEvent<HTMLElement>) => void
}

const ActionButton = ({children, onClickHandler}: Props) => {
  return (
    <Button variant={'outlined'} sx={buttonsStyles} onClick={onClickHandler}>
      {
        children
      }
    </Button>
  );
};

export default ActionButton;
