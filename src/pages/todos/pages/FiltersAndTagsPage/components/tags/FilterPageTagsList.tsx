import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@mui/material';
import {deleteUserTag} from '@shared/api/services/todosService/fetchTodos';
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
import useTodosByQuery from '@pages/todos/hooks/useTodoCountByQuery';
import {useNavigate} from 'react-router-dom';

const FilterPageTagsList = memo(({userTags}: {userTags: ITag[]}) => {
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
              onDelete={onDeleteTag}/>) :
            <Box sx={{padding: '16px 0', fontSize: '16px', color: 'grey'}}>
              A place for your tags.
            </Box>
      }
    </Box>
  );
});


export default FilterPageTagsList;
