import React from 'react';
import {Box, Divider, IconButton, List, ListItemButton, Typography} from '@mui/material';
import {PrioritiesFlags} from '@shared/components/PrioritiesFlags';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteIcon from '@mui/icons-material/Delete';

interface DropdownActionMenuProps {
    onDelete: () => void,
    onDuplicate: () => void,
    onSetPriority: (priority: string) => void
}

const DropdownActionMenu = ({onDelete, onDuplicate, onSetPriority}: DropdownActionMenuProps) => {
  return (
    <Box padding={'0 10px'}>
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
  );
};

export default DropdownActionMenu;
