import React from 'react';
import {Menu} from '@mui/material';
import {Anchor} from '@shared/interfaces';

interface dropdownMenuProps{
    anchorEl: Anchor,
    handleClose: (e: React.SyntheticEvent) => void,
    children: React.ReactNode
}
const DropdownMenu = ({anchorEl, handleClose, children}: dropdownMenuProps) => {
  return (
    <Menu
      sx = {{width: 'auto'}}
      id="menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}

    >
      {children}
    </Menu>
  );
};

export default DropdownMenu;
