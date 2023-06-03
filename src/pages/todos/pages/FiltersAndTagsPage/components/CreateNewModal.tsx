import React, {useState} from 'react';
import BasicModal from '@shared/components/modal';
import {Box, TextField, Typography} from '@mui/material';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import {createNewUserTag} from '@shared/api/services/todosService/fetchTodos';
import {useDispatch, useSelector} from 'react-redux';
import {userIdSelector} from '@pages/authorization/store';
import ColorTagSelect from '@pages/todos/pages/FiltersAndTagsPage/components/ColorTagSelect';
import {addNewUserTag} from '@entities/tag/store/tagStore';
import {configureNewTag} from '@entities/tag/utils/configureInitialTag';

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
  const [tagName, setTagName] = useState('')
  const userId = useSelector(userIdSelector)
  const isValid = tagName.trim().length > 0;
  const dispatch = useDispatch()

  const onSubmit = () => {
    const newTag = configureNewTag(tagName)
    createNewUserTag(newTag, userId)
    dispatch(addNewUserTag(newTag))
    setTagName('')
    onClose()
  }

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
            <TextField onChange={(e) => setTagName(e.currentTarget.value)}
              value={tagName}
              variant={'outlined'}
              className={'create-tag-input'}
              inputProps={{autoFocus: true}}/>
          </Box>
          <Box>
            <Typography fontSize={'15px'} fontWeight={600} mb={'5px'}>
              Tag color
            </Typography>
            <ColorTagSelect/>
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
