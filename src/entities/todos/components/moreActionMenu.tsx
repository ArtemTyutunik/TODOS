import React from 'react';
import {IconButton, Tooltip} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DropdownMenu from '@shared/components/dropdownMenu';
import DropdownActionMenu from '@entities/todos/components/DropdownActionMenu';
import useAnchorElement from '@shared/hooks/useAnchorElement';

interface MoreActionsMenuProps {
    onDelete: (e: React.SyntheticEvent) => void,
    onDuplicate: (e: React.SyntheticEvent) => void,
    onSetPriority: (e: React.SyntheticEvent, priority: string) => void
}


const MoreActionsMenu = ({onDelete, onDuplicate, onSetPriority}: MoreActionsMenuProps) => {
  const [anchorEl, addAnchorEl, removeAnchorEl] = useAnchorElement(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    addAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    removeAnchorEl();
  };

  return (
    <>
      <Tooltip title={'More actions'}>
        <IconButton onClick={handleOpenUserMenu}>
          <MoreHorizIcon color={'action'}/>
        </IconButton>
      </Tooltip>

      <DropdownMenu anchorEl={anchorEl} handleClose={handleCloseMenu}>
        <DropdownActionMenu onDelete={onDelete} onDuplicate={onDuplicate} onSetPriority={onSetPriority}/>
      </DropdownMenu>
    </>
  );
};

export default MoreActionsMenu;
