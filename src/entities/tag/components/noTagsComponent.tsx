import {useAppDispatch} from '@app/store';
import {Box, IconButton, List, ListItem, ListItemButton, Typography} from '@mui/material';
import {AddIcon} from '@shared/components/icons';
import {configureNewTag} from '@entities/tag/utils/configureInitialTag';
import {createNewUserTagThunk} from '@entities/tag/store/tagThunks';

interface Props {
    search: string
}
const NoTagsComponent = ({search}: Props) => {
  const dispatch = useAppDispatch()

  const onClickHandler = async () => {
    const configuredTag = configureNewTag(search)

    dispatch(createNewUserTagThunk(configuredTag))
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
