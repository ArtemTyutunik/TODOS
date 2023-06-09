import React from 'react';
import {useParams} from 'react-router-dom';
import {useTodosByQuery} from '@pages/todos/hooks';
import {TodoList} from '@pages/todos/components';

const FilteredByTagTodosPage = () => {
  const {id} = useParams()
  const filteredTodos = useTodosByQuery('tags', id!)
  return (
    <TodoList todos={filteredTodos}/>
  );
};

export default FilteredByTagTodosPage;
