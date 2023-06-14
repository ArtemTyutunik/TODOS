import {useNavigate} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {iconStyles, tagActionStyles, tagItemContainer} from './componentsStyles';
import {ITag} from '@shared/interfacesAndTypes';
import {useVisable} from '@shared/hooks';
import {useTodosByQuery} from '@pages/todos/hooks';
import TodosCount from '@shared/components/TodosCount';
import CustomIconButton from '@shared/components/CustomIconButton';
import TagInfoModal from '@pages/todos/pages/FiltersAndTagsPage/components/tags/TagInfoModal';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import TagIcon from '@shared/tagIcon';
import {useToggleFavorite} from '@features/addToFavorites';

interface TagItemProps {
    tag: ITag,
    onDelete: (tag: string) => void,
}

export default function TagItem({tag, onDelete}: TagItemProps) {
  const [isConfirmDeleteModalVisable, openConfirmDeleteModal, onCloseConfirmDeleteModal] = useVisable(false)
  const [isEditModalVisable, openEditModal, onCloseEditModal] = useVisable(false)
  const todoWithThisTagCount = useTodosByQuery('tags', tag.id).length
  const navigate = useNavigate()
  const {isFavorite, toggleFavorite} = useToggleFavorite(tag.id)

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
        <CustomIconButton onClick={toggleFavorite}>
          {
            isFavorite ? <FavoriteIcon sx={{...iconStyles, color: 'red'}}/> :
              <FavoriteBorderIcon sx={iconStyles}/>
          }
        </CustomIconButton>

        {/*edit action*/}
        <CustomIconButton onClick={openEditModal}>
          <DriveFileRenameOutlineIcon sx={iconStyles}/>
        </CustomIconButton>

        {
          isEditModalVisable && <TagInfoModal editMode
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
