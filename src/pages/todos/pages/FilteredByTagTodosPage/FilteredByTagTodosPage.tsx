import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useTodosByQuery} from '@pages/todos/hooks';
import {PageTitle, TodoList} from '@pages/todos/components';
import useTagById from '@pages/todos/pages/FilteredByTagTodosPage/hooks/useTagById';
import {Box} from '@mui/material';
import NoTodosWithTag from '@pages/todos/pages/FilteredByTagTodosPage/ui/noTodosWithTag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomIconButton from '@shared/components/CustomIconButton';
import {FILTERS_AND_TAGS_LINK} from '@shared/constants';

const FilteredByTagTodosPage = () => {
  const {id} = useParams()
  const filteredTodos = useTodosByQuery('tags', id!)
  const tag = useTagById(id)
  const navigate = useNavigate()

  return (
    <>
      <PageTitle>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <CustomIconButton sx={{mr: '10px'}} onClick={() => navigate('/' + FILTERS_AND_TAGS_LINK)}>
            <ArrowBackIcon sx={{fontSize: '18px'}}/>
          </CustomIconButton>
          {tag.name}
        </Box>
      </PageTitle>
      {
        filteredTodos.length === 0 ? <NoTodosWithTag/> :
            <TodoList noAddButton todos={filteredTodos}/>
      }
    </>
  );
};

export default FilteredByTagTodosPage;
