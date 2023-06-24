import React from 'react';
import {Box, Divider, IconButton, List, ListItemButton, Tooltip, Typography} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import DropdownMenu from '@shared/components/dropdownMenu';
import {useAnchorElement, useVisable} from '@shared/hooks';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import MoveTodo from '@entities/todos/components/MoveTodo';
import {PrioritiesFlags} from '@shared/constants/PrioritiesFlags';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {ITodo} from '@shared/interfacesAndTypes';

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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    addAnchorEl(event.currentTarget);
  }

  return (
    <>
      <Tooltip title={'More actions'}>
        <IconButton onClick={handleOpenUserMenu}>
          <MoreHorizIcon color={'action'}/>
        </IconButton>
      </Tooltip>

      <DropdownMenu anchorEl={anchorEl} handleClose={removeAnchorEl}>
        {/*//@ts-ignore*/}
        <Box padding={'0 10px'}>
          <List>
            <ListItemButton sx = {{padding: '10px 0'}} onClick={onOpenTodoDetails}>
              <InfoIcon sx={{color: 'grey'}}/>
              <Typography ml={'15px'}>
                      Info
              </Typography>
            </ListItemButton>
            <Divider/>
            <Box mt={'10px'}>
              <MoveTodo isUp text='Lift up todo'/>
              <MoveTodo isUp={false} text='Lift down todo'/>
              <Divider/>
            </Box>
            <Box m={'10px 0'}>
              <Typography>Set priority</Typography>
              <Box display={'flex'}>
                {PrioritiesFlags.map((Priority) => <Box mr={'10px'} key={Priority.value}>
                  <IconButton onClick={() => onSetPriority(Priority.value)}>
                    <Priority.Icon/>
                  </IconButton>
                </Box>,
                )}
              </Box>
            </Box>

            <ListItemButton sx = {{padding: '10px 0', marginBottom: '10px'}} onClick={onDuplicate}>
              <QueueIcon sx={{color: 'grey'}}/>
              <Typography ml={'15px'}>
                          Duplicate
              </Typography>
            </ListItemButton>

            <ListItemButton sx = {{padding: '10px 0', marginBottom: '10px'}} onClick={setAsCurrent}>
              <CheckCircleOutlineIcon sx={{color: todo?.isCurrent ? '#1976d2': 'grey'}}/>
              <Typography ml={'15px'}>
                  Set as current
              </Typography>
            </ListItemButton>
          </List>
          <Divider/>
          <ListItemButton sx = {{padding: '10px 0', margin: '10px 0'}} onClick={openDeleteModalOpen}>
            <DeleteIcon sx={{color: 'grey'}}/>
            <Typography ml={'15px'}>
                      Delete
            </Typography>
          </ListItemButton>
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

export default MoreActionsMenu;
