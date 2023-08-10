import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {IFavorite, ITag} from '@shared/interfacesAndTypes';
import {useTagById} from '@entities/tag';
import TagIcon from '@shared/tagIcon';
import CustomIconButton from '@shared/components/CustomIconButton';
import {useToggleFavorite} from '@features/addToFavorites';
import DrawerListItem from '@shared/components/DrawerListItem';

const FavoritesList = ({favorites}: {favorites: IFavorite[]}) => {
  return (
    <div>
      {
        favorites.map((favorite) => <FavoriteItem favorite={favorite}
          key={favorite.itemId}/>)
      }
    </div>
  );
};

const FavoriteItem = ({favorite}: {favorite: IFavorite}) => {
  const item = useTagById<ITag>(favorite.itemId)
  const navigate = useNavigate()
  const {deleteFromFavorites} = useToggleFavorite(item?.id)

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteFromFavorites()
  }

  return item ? (<DrawerListItem onClick={() => navigate('/tags/' + item?.id)}>
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <TagIcon background={item?.settings.background}/>
      <Typography marginLeft={'10px'}>
        {item?.name}
      </Typography>
    </Box>
    <CustomIconButton className={'hover_content'}
      onClick={onDelete}>
      <DeleteOutlineIcon sx={{color: '#808080', fontSize: '18px'}}/>
    </CustomIconButton>
  </DrawerListItem> ) : null
}

export default FavoritesList;
