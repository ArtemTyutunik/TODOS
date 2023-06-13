import {useNavigate} from 'react-router-dom';
import {Box, ListItemButton, Typography} from '@mui/material';
import {IFavorite} from '@shared/interfacesAndTypes';
import {useTagById} from '@entities/tag';
import TagIcon from '@shared/tagIcon';

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
  const item = useTagById(favorite.itemId)
  const navigate = useNavigate()

  return <ListItemButton sx={{margin: '0 10px', padding: '6px 8px', borderRadius: '4px'}}
    onClick={() => navigate('/tags/' + item.id)}>
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <TagIcon background={item?.settings.background}/>
      <Typography marginLeft={'10px'}>
        {item?.name}
      </Typography>
    </Box>
  </ListItemButton>
}

export default FavoritesList;
