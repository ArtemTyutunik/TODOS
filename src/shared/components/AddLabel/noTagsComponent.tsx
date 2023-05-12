import React from 'react';
import {Box, IconButton, List, ListItem, ListItemButton, Typography} from '@mui/material';
import {addNewUserTag} from '@pages/authorization/store/'
import AddIcon from '@shared/components/AddIcon';
import {useDispatch} from 'react-redux';

interface Props {
    search: string
}
const NoTagsComponent = ({search}: Props) => {
  const dispatch = useDispatch()
  return (
    <Box>
      <Typography textAlign={'center'} fontSize={'13px'} color={'#555555'} fontFamily={'sans-serif'}>
        Tag not found
      </Typography>
      <List sx={{padding: '0 8px'}}>
        <ListItem sx={{padding: 0}}>
          <ListItemButton onClick={() => dispatch(addNewUserTag(search))}
            sx={{display: 'flex',
              justifyContent: 'center',
              padding: 0}
            }>
            <IconButton>
              <AddIcon fontSize={'small'}/>
            </IconButton>
            <Typography textAlign={'center'}
              fontSize={'13px'}
              color={'#555555'}
              fontFamily={'sans-serif'}
              fontWeight={700}>
                Add new {search}
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default NoTagsComponent;
