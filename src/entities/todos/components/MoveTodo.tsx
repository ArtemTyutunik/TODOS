import React from 'react';
import {ListItemButton, Typography} from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

interface MoveTodoProps {
    isUp: boolean,
    text: string
}

const MoveTodo = ({isUp, text}: MoveTodoProps) => {
  const button = isUp ? <NorthIcon/> : <SouthIcon/>
  return (
    <ListItemButton sx = {{padding: '10px 0px'}}>
      {button}
      <Typography ml={'3px'}>{text}</Typography>
    </ListItemButton>
  );
}

export default MoveTodo;
