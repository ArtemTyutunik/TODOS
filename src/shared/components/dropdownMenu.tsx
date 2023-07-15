import React from 'react';
import {Menu} from '@mui/material';
import {Anchor} from '@shared/interfacesAndTypes';

interface dropdownMenuProps{
    anchorEl: Anchor,
    handleClose: (e: React.MouseEvent<HTMLElement>) => void,
    children: React.ReactNode
}
const DropdownMenu = ({anchorEl, handleClose, children}: dropdownMenuProps) => {
  return (
    <Menu
      id="menu"
      data-testid={'dropdown-menu'}
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
      sx={{marginTop: '10px', minWidth: 'fit-content'}}
    >
      {children}
    </Menu>
  );
};

export default DropdownMenu;
