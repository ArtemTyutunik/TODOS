import BasicModal from '@shared/components/modal';
import {Box, SelectChangeEvent, TextField, Typography} from '@mui/material';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import {createNewUserTag, editUserTag} from '@shared/api/services/todosService/fetchTodos';
import {useDispatch, useSelector} from 'react-redux';
import {userIdSelector} from '@entities/user/model/store';
import ColorTagSelect from '@pages/todos/pages/FiltersAndTagsPage/components/tags/ColorTagSelect';
import {addNewUserTag, resetTag} from '@entities/tag/store/tagStore';
import {
  resetTagModalAction,
  setTagNameAction,
  setTagSettingsAction,
  useTagModalReducer,
} from '@pages/todos/pages/FiltersAndTagsPage/model/useTagModalReducer';
import {colorType, ITag} from '@shared/interfacesAndTypes';
import {inputSectionStyle} from './componentsStyles';


interface Props {
  isOpen: boolean,
  onClose: () => void,
  editMode?: boolean,
  tag?: ITag
}

const CreateNewModal = ({isOpen, onClose, editMode, tag}: Props) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const [tagState, tagDispatcher] = useTagModalReducer(tag)

  const onCreateTag = () => {
    createNewUserTag(tagState, userId)
    dispatch(addNewUserTag(tagState))
    tagDispatcher(setTagNameAction(''))
    onClose()
  }

  const onEditTag = () => {
    if (tag) {
      editUserTag(tagState, userId)
      tagDispatcher(resetTagModalAction(tagState))
      dispatch(resetTag(tagState))
      onClose()
    }
  }

  const onSelectChange = (e: SelectChangeEvent, colors: colorType[]) => {
    tagDispatcher(setTagSettingsAction(colors.find((item) => item.name === e.target.value)!))
  }

  const isValid = tagState.name.trim().length > 0;

  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <Box minWidth={{laptop: '500px', largeMobile: '300px'}} sx={(theme) => ({color: theme.text.title})}>
        <Box padding={'10px 15px'}>
          <Typography fontSize={'19px'} fontWeight={600}>
              Add tag
          </Typography>
        </Box>
        <Box sx={inputSectionStyle(isError)}>
          <Box mb={'15px'}>
            <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
              Tag name
            </Typography>
            <TextField onChange={(e) => tagDispatcher(setTagNameAction(e.currentTarget.value))}
              value={tagState.name}
              variant={'outlined'}
              className={'create-tag-input'}
              inputProps={{autoFocus: true}}/>
          </Box>
          <Box>
            <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
              Tag color
            </Typography>
            <ColorTagSelect settings={tagState.settings} onSelectChange={onSelectChange}/>
          </Box>
        </Box>
        <Box margin={'10px 0'} paddingRight={'15px'}>
          <FormSubmissionButtons onClose={onClose}
            isValid={isValid}
            onSubmit={editMode ? onEditTag : onCreateTag}/>
        </Box>
      </Box>
    </BasicModal>
  );
};

export default CreateNewModal;
