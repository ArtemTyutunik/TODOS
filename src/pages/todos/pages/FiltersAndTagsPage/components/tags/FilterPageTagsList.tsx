import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Typography} from '@mui/material';
import {default as LabelIcon} from '@mui/icons-material/LocalOffer';
import TodosCount from '@shared/components/TodosCount';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CustomIconButton from '@shared/components/CustomIconButton';
import {deleteUserTag} from '@shared/api/services/todosService/fetchTodos';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import {useVisable} from '@shared/hooks';
import {deleteTag} from '@entities/tag/store/tagStore';
import {userIdSelector} from '@entities/user/model/store';
import {ITag} from '@shared/interfacesAndTypes';
import CreateNewModal from './CreateNewModal';
import {
  iconStyles,
  tagActionStyles,
  tagItemContainer,
  tagNameStyle,
} from './componentsStyles';

const FilterPageTagsList = ({userTags}: {userTags: ITag[]}) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)

  const onDeleteTag = (tag: string) => {
    dispatch(deleteTag(tag))
    deleteUserTag(tag, userId)
  }

  return (
    <Box mt={'10px'}>
      {
        userTags.length > 0 ?
            userTags.map((tag) => <TagItem key={tag.name}
              tag={tag}
              allTags={userTags}
              onDelete={onDeleteTag}/>) :
            <Box sx={{padding: '16px 0', fontSize: '16px', color: 'grey'}}>
              A place for your tags.
            </Box>
      }
    </Box>
  );
};

interface TagItemProps {
  tag: ITag,
  allTags: ITag[],
  onDelete: (tag: string) => void
}

function TagItem({tag, onDelete, allTags}: TagItemProps) {
  const [isConfirmDeleteModalVisable, openConfirmDeleteModal, onCloseConfirmDeleteModal] = useVisable(false)
  const [isEditModalVisable, openEditModal, onCloseEditModal] = useVisable(false)

  return <>
    <Box sx={tagItemContainer}>
      <Box display={'flex'} alignItems={'center'}>
        <LabelIcon sx={tagNameStyle(tag.settings!.background)}/>
        <Typography marginLeft={'10px'} color={'#333333'}>{tag.name}</Typography>
      </Box>
      <TodosCount>
        1
      </TodosCount>
      <Box className='tag_actions' sx={tagActionStyles}>
        <CustomIconButton>
          <FavoriteBorderIcon sx={iconStyles}/>
        </CustomIconButton>

        {/*edit action*/}
        <CustomIconButton onClick={openEditModal}>
          <DriveFileRenameOutlineIcon sx={iconStyles}/>
        </CustomIconButton>

        <CreateNewModal editMode
          allTags={allTags}
          isOpen={isEditModalVisable}
          onClose={onCloseEditModal}
          tag={tag}/>

        {/*delete action*/}
        <CustomIconButton onClick={openConfirmDeleteModal}>
          <DeleteOutlineIcon sx={iconStyles}/>
        </CustomIconButton>

        <ConfirmDeleteModal isOpen={isConfirmDeleteModalVisable}
          onClose={onCloseConfirmDeleteModal}
          onSubmit={() => onDelete(tag.name)}/>
      </Box>
    </Box>
  </>
}

export default FilterPageTagsList;
