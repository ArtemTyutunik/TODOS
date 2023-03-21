import React from 'react';
import {Button, Theme} from '@mui/material';

const buttonsStyles = (theme: Theme) => ({
  color: '#7d7b74',
  backgroundColor: theme.background.lightGrey,
  border: '1px solid #ddd',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '11px',
  padding: 0,
});

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
