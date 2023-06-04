import BasicModal from '@shared/components/modal';
import {Box, SelectChangeEvent, TextField, Typography} from '@mui/material';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import {createNewUserTag} from '@shared/api/services/todosService/fetchTodos';
import {useDispatch, useSelector} from 'react-redux';
import {userIdSelector} from '@pages/authorization/store';
import ColorTagSelect from '@pages/todos/pages/FiltersAndTagsPage/components/ColorTagSelect';
import {addNewUserTag} from '@entities/tag/store/tagStore';
import {
  setTagNameAction,
  setTagSettingsAction,
  useTagModalReducer,
} from '@pages/todos/pages/FiltersAndTagsPage/model/useTagModalReducer';
import {colorType} from '@shared/constants/colors';

interface Props {
    isOpen: boolean,
    onClose: () => void
}

const inputSectionStyle = {
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'flex-start',
  'padding': '10px 15px',
  'border': '1px solid #f5f5f5',
  'borderLeft': 0,
  'borderRight': 0,
  'marginBottom': '10px',
  '& .create-tag-input .MuiInputBase-root': {
    '& fieldset': {
      'border': '1px solid #ddd !important',
    },
  },
  '& .create-tag-input': {
    width: '100%',
  },
}

const CreateNewModal = ({isOpen, onClose}: Props) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const [tagState, tagDispatcher] = useTagModalReducer()

  const onSubmit = () => {
    createNewUserTag(tagState, userId)
    dispatch(addNewUserTag(tagState))
    tagDispatcher(setTagNameAction(''))
    onClose()
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
        <Box sx={inputSectionStyle}>
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
          <FormSubmissionButtons onClose={onClose} isValid={isValid} onSubmit={onSubmit}/>
        </Box>
      </Box>
    </BasicModal>
  );
};

export default CreateNewModal;
