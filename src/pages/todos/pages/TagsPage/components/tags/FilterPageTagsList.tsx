import React, {memo} from 'react';
import {Box} from '@mui/material';
import {ITag} from '@shared/interfacesAndTypes';
import TagItem from '@pages/todos/pages/TagsPage/components/tags/TagListItem';
import {useAppDispatch} from '@app/store';
import {deleteUserTagThunk} from '@entities/tag/store/tagThunks';


const FilterPageTagsList = memo(({userTags}: {userTags: ITag[]}) => {
  const dispatch = useAppDispatch()

  const onDeleteTag = (tag: string) => {
    dispatch(deleteUserTagThunk(tag))
  }

  return (
    <Box mt={'10px'}>
      {
        userTags.length > 0 ?
            userTags.map((tag) => <TagItem key={tag.name}
              tag={tag}
              onDelete={onDeleteTag}/>) :
            <Box sx={{padding: '16px 0', fontSize: '16px', color: 'grey'}}>
              A place for your tags.
            </Box>
      }
    </Box>
  );
});


export default FilterPageTagsList;
