import React from 'react';
import {IconButton} from '@mui/material';

interface Props {
    children: React.ReactElement
}

const CustomIconButton = ({children}: Props) => {
  return (
    <IconButton sx={{'borderRadius': '4px', 'padding': '4px'}}>
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
