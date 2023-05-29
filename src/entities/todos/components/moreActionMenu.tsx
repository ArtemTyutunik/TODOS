import React from 'react';
import {Box, IconButton, Tooltip, Typography} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DropdownMenu from '@shared/components/dropdownMenu';
import DropdownActionMenu from '@entities/todos/components/DropdownActionMenu';
import useAnchorElement from '@shared/hooks/useAnchorElement';
import useVisable from '@shared/hooks/useVisable';
import BasicModal from '@shared/components/modal';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';

interface MoreActionsMenuProps {
    onDelete: () => void,
    onDuplicate: () => void,
    onSetPriority: (priority: string) => void
}


const MoreActionsMenu = ({onDelete, onDuplicate, onSetPriority}: MoreActionsMenuProps) => {
  const [anchorEl, addAnchorEl, removeAnchorEl] = useAnchorElement(null);
  const [isDeleteModalOpen, openDeleteModalOpen, closeDeleteModalOpen] = useVisable(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(event.currentTarget);
  };

  function ConfirmDeleteModal() {
    return <BasicModal open={isDeleteModalOpen} onClose={closeDeleteModalOpen}>
      <Box padding={'10px'}>
        <Typography sx={(theme) => ({color: theme.text.main, padding: '20px 10px'})}>
            Are you sure that you want to delete this task?
        </Typography>
        <FormSubmissionButtons isValid={true} onClose={closeDeleteModalOpen} onSubmit={onDelete}/>
      </Box>
    </BasicModal>
  }

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
      {
        isDeleteModalOpen && <ConfirmDeleteModal/>
      }
    </>
  );
};

export default MoreActionsMenu;
