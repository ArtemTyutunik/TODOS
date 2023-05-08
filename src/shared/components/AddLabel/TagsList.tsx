import React from 'react';
import {Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

const TagsList = () => {
  return (
    <Box width={'100%'} maxHeight={'150px'}>
      <List>
        {
          ['read', 'rework', 'rewrite'].map((item) => <ListItem
            key={item}
            sx={{padding: '0'}}>
            <ListItemButton
              role={undefined}
              dense
              sx={{padding: '0 8px'}}
            >
              <IconButton>
                <TurnedInIcon sx={{fontSize: '16px'}}/>
              </IconButton>
              <ListItemText primary={`${item}`}
                sx={(theme) => ({
                  marginRight: '14px',
                  color: theme.text.title})}/>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={false}
                  tabIndex={-1}
                  disableRipple
                  size={'small'}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>)
        }
      </List>
    </Box>

  );
};

export default TagsList;
