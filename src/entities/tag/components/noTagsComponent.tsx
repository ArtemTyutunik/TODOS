import {useDispatch, useSelector} from 'react-redux';
import {Box, IconButton, List, ListItem, ListItemButton, Typography} from '@mui/material';
import {userIdSelector} from '@entities/user/model/store/'
import {AddIcon} from '@shared/components/icons';
import {createNewUserTag} from '@shared/api/services/tags';
import {addNewUserTag} from '@entities/tag/store/tagStore';
import {configureNewTag} from '@entities/tag/utils/configureInitialTag';
import {toast} from 'react-toastify';
import TagsActionFailed from '@shared/components/Notification/errors/tagsActionsFailed';
import {options} from '@shared/components/Notification/constants';
import {styled} from '@mui/material/styles';

interface Props {
    search: string
}
const NoTagsComponent = ({search}: Props) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)

  const onClickHandler = async () => {
    const configuredTag = configureNewTag(search)

    try {
      await createNewUserTag(configuredTag, userId)
      dispatch(addNewUserTag(configuredTag))
    } catch (e) {
      toast(<TagsActionFailed action={'add'}/>, options)
    }
  }


  return (
    <Box>
      <InfoText>
        Tag not found
      </InfoText>
      <List sx={{padding: '0 8px'}}>
        <ListItem sx={{padding: 0}}>
          <ListItemButton onClick={onClickHandler}
            sx={{display: 'flex',
              justifyContent: 'center',
              padding: 0}
            }>
            <IconButton>
              <AddIcon fontSize={'small'} sx={(theme) => ({color: theme.background.icons})}/>
            </IconButton>
            <ActionText>
                Add new {search}
            </ActionText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

const InfoText = styled(Typography)(({theme}) => ({
  textAlign: 'center',
  fontSize: '13px',
  color: theme.text.title,
  fontFamily: 'sans-serif',
}))

const ActionText = styled(Typography)(({theme}) => ({
  textAlign: 'center',
  fontSize: '13px',
  color: theme.text.title,
  fontFamily: 'sans-serif',
}))

export default NoTagsComponent;
