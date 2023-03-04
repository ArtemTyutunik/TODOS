import React from 'react';
import DropdownMenu from '@shared/components/dropdownMenu';
import {
  Box, Divider,
  IconButton, List, ListItemButton,
  Tooltip,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteIcon from '@mui/icons-material/Delete';
import {PrioritiesFlags} from '@shared/components/PrioritiesFlags';

interface MoreActionsMenuProps {
    onDelete: (e: React.SyntheticEvent) => void,
    onDuplicate: (e: React.SyntheticEvent) => void,
    onSetPriority: (e: React.SyntheticEvent, priority: string) => void
}


const MoreActionsMenu = ({onDelete, onDuplicate, onSetPriority}: MoreActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={'More actions'}>
        <IconButton onClick={handleOpenUserMenu}>
          <MoreHorizIcon color={'action'}/>
        </IconButton>
      </Tooltip>

      <DropdownMenu anchorEl={anchorEl} handleClose={handleCloseMenu}>
        <Box padding={'0 10px'}>
          <Box m={'10px 0'}>
            <Typography>Set priority</Typography>
            <Box display={'flex'}>
              {PrioritiesFlags.map((Priority) => <Box mr={'10px'} key={Priority.value}>
                <IconButton onClick={(event) => onSetPriority(event, Priority.value)}>
                  <Priority.Icon/>
                </IconButton>
              </Box>,
              )}
            </Box>
          </Box>
          <List>
            <ListItemButton sx = {{padding: '10px 0', marginBottom: '10px'}} onClick={onDuplicate}>
              <QueueIcon sx={{color: 'grey'}}/>
              <Typography ml={'15px'}>
                Duplicate
              </Typography>
            </ListItemButton>
          </List>

          <Divider/>
          <ListItemButton sx = {{padding: '10px 0', margin: '10px 0'}} onClick={onDelete}>
            <DeleteIcon sx={{color: 'grey'}}/>
            <Typography ml={'15px'}>
                Delete
            </Typography>
          </ListItemButton>
        </Box>
      </DropdownMenu>
    </>
  );
};

export default MoreActionsMenu;
