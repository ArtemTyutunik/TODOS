import React from 'react';
import {Menu, Theme} from '@mui/material';
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
      sx={sxStyles}
    >
      {children}
    </Menu>
  );
};

const sxStyles = (theme: Theme) => ({
  'marginTop': '10px',
  'minWidth': 'fit-content',
  '& .MuiList-root': {
    backgroundColor: theme.background.lightGrey,
    color: theme.text.title,
  },
})

export default DropdownMenu;
