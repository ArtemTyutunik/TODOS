import React from 'react';
import {useParams} from 'react-router-dom';
import {useTodosByQuery} from '@pages/todos/hooks';
import {PageTitle, TodoList} from '@pages/todos/components';
import useTagById from '@pages/todos/pages/FilteredByTagTodosPage/hooks/useTagById';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {Box, IconButton} from '@mui/material';

const FilteredByTagTodosPage = () => {
  const {id} = useParams()
  const filteredTodos = useTodosByQuery('tags', id!)
  const tag = useTagById(id)

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <PageTitle>
          <IconButton sx={{alignItems: 'center'}} onClick={() => window.history.back()}>
            <KeyboardArrowLeftIcon/>
          </IconButton>
          {tag.name}
        </PageTitle>
      </Box>
      <TodoList noAddButton todos={filteredTodos}/>
    </>
  );
};

export default FilteredByTagTodosPage;
