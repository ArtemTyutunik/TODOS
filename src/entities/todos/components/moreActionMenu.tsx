import React from 'react';
import {Box, Divider, IconButton, List, ListItemButton, Tooltip, Typography, useTheme} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import DropdownMenu from '@shared/components/dropdownMenu';
import {useAnchorElement, useVisable} from '@shared/hooks';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import {PrioritiesFlags} from '@shared/constants/PrioritiesFlags';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {ITodo} from '@shared/interfacesAndTypes';
import CustomIconButton from '@shared/components/CustomIconButton';

interface MoreActionsMenuProps {
    onDelete: () => void,
    onDuplicate: () => void,
    onSetPriority: (priority: string) => void,
    onOpenTodoDetails: () => void,
    setAsCurrent: () => void
    todo?: ITodo
}


const MoreActionsMenu = ({todo, onDelete, onDuplicate, onSetPriority, onOpenTodoDetails, setAsCurrent}:
                             MoreActionsMenuProps) => {
  const [anchorEl, addAnchorEl, removeAnchorEl] = useAnchorElement(null);
  const [isDeleteModalOpen, openDeleteModalOpen, closeDeleteModalOpen] = useVisable(false)
  const theme = useTheme();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(event.currentTarget);
  }

  return (
    <>
      <Tooltip title={'More actions'}>
        <IconButton onClick={handleOpenUserMenu}>
          <MoreHorizIcon sx={{color: theme.text.title}}/>
        </IconButton>
      </Tooltip>

      <DropdownMenu anchorEl={anchorEl} handleClose={removeAnchorEl}>
        <Box minWidth={'250px'} padding={'5px'}>
          <List>
            <ListItemButton sx = {listItemStyles} onClick={onOpenTodoDetails}>
              <InfoIcon sx={{color: theme.background.icons}}/>
              <Typography ml={'25px'}>
                      Info
              </Typography>
            </ListItemButton>
            <Divider/>
            <Box sx={listItemStyles} display={'flex'} flexDirection={'column'}>
              <Typography marginBottom={'5px'}>Set priority</Typography>
              <Box display={'flex'}>
                {PrioritiesFlags.map((Priority) => <Box mr={'10px'} key={Priority.value}>
                  <CustomIconButton onClick={() => onSetPriority(Priority.value)}>
                    <Priority.Icon/>
                  </CustomIconButton>
                </Box>,
                )}
              </Box>
            </Box>

            <ListItemButton sx = {listItemStyles} onClick={onDuplicate}>
              <QueueIcon sx={{color: theme.background.icons}}/>
              <Typography ml={'25px'}>
                          Duplicate
              </Typography>
            </ListItemButton>

            <ListItemButton sx = {listItemStyles} onClick={setAsCurrent}>
              <CheckCircleOutlineIcon sx={{color: todo?.isCurrent ? '#1976d2': theme.background.icons}}/>
              <Typography ml={'25px'}>
                  Set as current
              </Typography>
            </ListItemButton>
            <Divider/>
            <ListItemButton sx = {listItemStyles} onClick={openDeleteModalOpen}>
              <DeleteIcon sx={{color: theme.background.icons}}/>
              <Typography ml={'25px'}>
                      Delete
              </Typography>
            </ListItemButton>
          </List>

        </Box>
      </DropdownMenu>
      {
        isDeleteModalOpen && <ConfirmDeleteModal isOpen
          onSubmit={onDelete}
          onClose={closeDeleteModalOpen}/>
      }
    </>
  );
};


const listItemStyles = {
  padding: '10px 0',
  marginBottom: '10px',
  marginLeft: '10px',
}

export default MoreActionsMenu;
