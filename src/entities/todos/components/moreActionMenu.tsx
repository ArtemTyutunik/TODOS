import React from 'react';
import {Box, IconButton, Tooltip, Typography} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DropdownMenu from '@shared/components/dropdownMenu';
import DropdownActionMenu from '@entities/todos/components/DropdownActionMenu';
import useAnchorElement from '@shared/hooks/useAnchorElement';

interface MoreActionsMenuProps {
    onDelete: () => void,
    onDuplicate: () => void,
    onSetPriority: (priority: string) => void
}


const MoreActionsMenu = ({onDelete, onDuplicate, onSetPriority}: MoreActionsMenuProps) => {
  const [anchorEl, addAnchorEl, removeAnchorEl] = useAnchorElement(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
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

      <DropdownMenu anchorEl={anchorEl} handleClose={removeAnchorEl}>
        <DropdownActionMenu onDelete={openDeleteModalOpen} onDuplicate={onDuplicate} onSetPriority={onSetPriority}/>
      </DropdownMenu>
    </>
  );
};

export default MoreActionsMenu;
