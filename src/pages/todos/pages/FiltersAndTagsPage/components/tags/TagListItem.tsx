import {useNavigate} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {iconStyles, tagActionStyles, tagItemContainer} from './componentsStyles';
import {ITag} from '@shared/interfacesAndTypes';
import {useVisable} from '@shared/hooks';
import {useTodosByQuery} from '@pages/todos/hooks';
import TodosCount from '@shared/components/TodosCount';
import CustomIconButton from '@shared/components/CustomIconButton';
import CreateNewModal from '@pages/todos/pages/FiltersAndTagsPage/components/tags/CreateNewModal';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import TagIcon from '@shared/tagIcon';

interface TagItemProps {
    tag: ITag,
    onDelete: (tag: string) => void,
    addToFavorite: (tagId: string) => void
}

export default function TagItem({tag, onDelete, addToFavorite}: TagItemProps) {
  const [isConfirmDeleteModalVisable, openConfirmDeleteModal, onCloseConfirmDeleteModal] = useVisable(false)
  const [isEditModalVisable, openEditModal, onCloseEditModal] = useVisable(false)
  const todoWithThisTagCount = useTodosByQuery('tags', tag.id).length
  const navigate = useNavigate()

  return <>
    <Box sx={tagItemContainer} onClick={() => navigate(`/tags/${tag.id}`)}>
      <Box display={'flex'} alignItems={'center'}>
        <TagIcon background={tag?.settings.background}/>
        <Typography marginLeft={'10px'} color={'#333333'}>{tag.name}</Typography>
      </Box>
      <TodosCount>
        {todoWithThisTagCount !== 0 && todoWithThisTagCount}
      </TodosCount>
      <Box className='tag_actions' sx={tagActionStyles} onClick={(e) => e.stopPropagation()}>
        <CustomIconButton onClick={() => addToFavorite(tag.id)}>
          <FavoriteBorderIcon sx={iconStyles}/>
        </CustomIconButton>

        {/*edit action*/}
        <CustomIconButton onClick={openEditModal}>
          <DriveFileRenameOutlineIcon sx={iconStyles}/>
        </CustomIconButton>

        {
          isEditModalVisable && <CreateNewModal editMode
            isOpen={isEditModalVisable}
            onClose={onCloseEditModal}
            tag={tag}/>
        }

        {/*delete action*/}
        <CustomIconButton onClick={openConfirmDeleteModal}>
          <DeleteOutlineIcon sx={iconStyles}/>
        </CustomIconButton>

        <ConfirmDeleteModal isOpen={isConfirmDeleteModalVisable}
          onClose={onCloseConfirmDeleteModal}
          onSubmit={() => {
            onCloseConfirmDeleteModal()
            onDelete(tag.id)
          }}/>
      </Box>
    </Box>
  </>
}
