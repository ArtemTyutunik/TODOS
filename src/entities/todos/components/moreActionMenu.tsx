import React from 'react';
import {IconButton, Tooltip} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DropdownMenu from '@shared/components/dropdownMenu';
import DropdownActionMenu from '@entities/todos/components/DropdownActionMenu';
import {useAnchorElement, useVisable} from '@shared/hooks';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import {Priority} from '@shared/interfacesAndTypes';

interface MoreActionsMenuProps {
    onDelete: () => void,
    onDuplicate: () => void,
    onSetPriority: (priority: Priority) => void
}


const MoreActionsMenu = ({onDelete, onDuplicate, onSetPriority}: MoreActionsMenuProps) => {
  const [anchorEl, addAnchorEl, removeAnchorEl] = useAnchorElement(null);
  const [isDeleteModalOpen, openDeleteModalOpen, closeDeleteModalOpen] = useVisable(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title={'More actions'}>
        <IconButton onClick={handleOpenUserMenu}>
          <MoreHorizIcon color={'action'}/>
        </IconButton>
      </Tooltip>

      <DropdownMenu anchorEl={anchorEl} handleClose={removeAnchorEl}>
        {/*//@ts-ignore*/}
        <DropdownActionMenu onDelete={openDeleteModalOpen} onDuplicate={onDuplicate} onSetPriority={onSetPriority}/>
      </DropdownMenu>
      {
        isDeleteModalOpen && <ConfirmDeleteModal isOpen
          onSubmit={onDelete}
          onClose={closeDeleteModalOpen}/>
      }
    </>
  );
};

export default MoreActionsMenu;
