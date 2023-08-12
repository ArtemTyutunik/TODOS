import React from 'react';
import {Button, Theme} from '@mui/material';

const buttonsStyles = (theme: Theme) => ({
  'color': theme.text.main,
  'backgroundColor': theme.background.lightGrey,
  'border': '1px solid #ddd',
  'boxShadow': 'none',
  'textTransform': 'none',
  'fontSize': '11px',
  'padding': 0,
  '&: hover': {
    'border': '1px solid #6e6d6d',
    'color': theme.text.title,
  },
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
