import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, IconButton, List, ListItem, ListItemButton, Typography} from '@mui/material';
import {addNewUserTag, userIdSelector} from '@pages/authorization/store/'
import AddIcon from '@shared/components/AddIcon';
import {createNewUserTag} from '@shared/api/services/todosService/fetchTodos';

interface Props {
    search: string
}
const NoTagsComponent = ({search}: Props) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)

  const onClickHandler = () => {
    createNewUserTag(search, userId)
        .then(() => dispatch(addNewUserTag(search)))
  }


  return (
    <Box>
      <Typography textAlign={'center'} fontSize={'13px'} color={'#555555'} fontFamily={'sans-serif'}>
        Tag not found
      </Typography>
      <List sx={{padding: '0 8px'}}>
        <ListItem sx={{padding: 0}}>
          <ListItemButton onClick={onClickHandler}
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
