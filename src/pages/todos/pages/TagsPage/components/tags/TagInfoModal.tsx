import React, {memo, useEffect, useState} from 'react';
import {Box, SelectChangeEvent} from '@mui/material';
import {useAppDispatch} from '@app/store';
import {useSelector} from 'react-redux';
import FormSubmissionButtons from '@shared/forms/ui/FormSubmissionButtons';
import {userTagsSelector} from '@entities/tag/store/tagStore';
import BasicModal from '@shared/components/modal';
import {
  resetTagModalAction,
  setTagNameAction,
  setTagSettingsAction,
  useTagModalReducer,
} from '@pages/todos/pages/TagsPage/model/useTagModalReducer';
import {colorType, ITag} from '@shared/interfacesAndTypes';
import TagInfoModalForm from '@pages/todos/pages/TagsPage/components/tags/TagInfoModalForm';
import {useToggleFavorite} from '@features/addToFavorites';
import {itemAlreadyExist} from '@shared/helpers';
import {createNewUserTagThunk, editUserTagThunk} from '@entities/tag/store/tagThunks';


interface Props {
  isOpen: boolean,
  onClose: () => void,
  editMode?: boolean,
  tag?: ITag
}

const TagInfoModal = memo(({isOpen, onClose, editMode, tag}: Props) => {
  const dispatch = useAppDispatch()
  const [isError, setIsError] = useState(false)
  const userTags = useSelector(userTagsSelector)
  const [tagState, tagDispatcher] = useTagModalReducer(tag)
  const {isFavorite, deleteFromFavorites, addNewFavorite} = useToggleFavorite(tagState?.id)

  const [chosenAsFavorite, setChosenAsFavorite] = useState<boolean>(isFavorite)

  useEffect(() => {
    setChosenAsFavorite(isFavorite)
  }, [isFavorite])

  const onCreateTag = () => {
    dispatch(createNewUserTagThunk(tagState))
    tagDispatcher(setTagNameAction(''))
    onClose()
  }

  const onEditTag = () => {
    if (tag) {
      tagDispatcher(resetTagModalAction(tagState))
      dispatch(editUserTagThunk(tagState))
      onClose()
    }
  }

  const onSelectChange = (e: SelectChangeEvent, colors: colorType[]) => {
    tagDispatcher(setTagSettingsAction(colors.find((item) => item.name === e.target.value)!))
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setIsError(itemAlreadyExist<ITag>(userTags, value, tagState))

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

  const isAllowed = !isError && isValid
  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <>
        <TagInfoModalForm tagState={tagState}
          isError={isError}
          onSubmit={isAllowed ? onSubmitModal : null}
          isChecked={chosenAsFavorite}
          onSelectChange={onSelectChange}
          onInputChange={onInputChange}
          toggleIsFavorite={toggleIsFavorite}
        />
        <Box margin={'10px 0'} paddingRight={'15px'}>
          <FormSubmissionButtons onClose={onClose}
            isValid={isAllowed}
            onSubmit={onSubmitModal}/>
        </Box>
      </>
    </BasicModal>
  );
});

export default TagInfoModal;
