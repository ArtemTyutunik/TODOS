import React, {memo, useEffect, useState} from 'react';
import {Box, SelectChangeEvent} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import {createNewUserTag, editUserTag} from '@shared/api/services/tags';
import {userIdSelector} from '@entities/user/model/store';
import {addNewUserTag, resetTag, userTagsSelector} from '@entities/tag/store/tagStore';
import BasicModal from '@shared/components/modal';
import {
  resetTagModalAction,
  setTagNameAction,
  setTagSettingsAction,
  useTagModalReducer,
} from '@pages/todos/pages/FiltersAndTagsPage/model/useTagModalReducer';
import {colorType, ITag} from '@shared/interfacesAndTypes';
import TagInfoModalForm from '@pages/todos/pages/FiltersAndTagsPage/components/tags/TagInfoModalForm';
import {useToggleFavorite} from '@features/addToFavorites';


interface Props {
  isOpen: boolean,
  onClose: () => void,
  editMode?: boolean,
  tag?: ITag
}

const TagInfoModal = memo(({isOpen, onClose, editMode, tag}: Props) => {
  const dispatch = useDispatch()
  const [isError, setIsError] = useState(false)
  const userTags = useSelector(userTagsSelector)
  const userId = useSelector(userIdSelector)
  const [tagState, tagDispatcher] = useTagModalReducer(tag)
  const {isFavorite, deleteFromFavorites, addNewFavorite} = useToggleFavorite(tagState?.id)

  const [chosenAsFavorite, setChosenAsFavorite] = useState<boolean>(isFavorite)

  useEffect(() => {
    setChosenAsFavorite(isFavorite)
  }, [isFavorite])

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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (userTags.find((tag) => tag.name.trim() === value.trim() && tag.id !== tagState.id)) {
      setIsError(true)
    } else {
      setIsError(false)
    }

    tagDispatcher(setTagNameAction(value))
  }

  const onSubmitModal = () => {
    editMode ? onEditTag() : onCreateTag()
    chosenAsFavorite ? addNewFavorite() : deleteFromFavorites()
  }

  const toggleIsFavorite = () => {
    setChosenAsFavorite((prevState) => !prevState)
  }

  const isValid = tagState.name.trim().length > 0;

  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <>
        <TagInfoModalForm tagState={tagState}
          isError={isError}
          isChecked={chosenAsFavorite}
          onSelectChange={onSelectChange}
          onInputChange={onInputChange}
          toggleIsFavorite={toggleIsFavorite}
        />
        <Box margin={'10px 0'} paddingRight={'15px'}>
          <FormSubmissionButtons onClose={onClose}
            isValid={isValid && !isError}
            onSubmit={onSubmitModal}/>
        </Box>
      </>
    </BasicModal>
  );
});

export default TagInfoModal;
