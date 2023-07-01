import React, {memo} from 'react';
import {Box} from '@mui/material';
import {IDate, ITodo} from '@shared/interfacesAndTypes';
import CreateTodoForm from '@features/todoFeatures/CreateTodo/components/createTodoForm';
import AddTaskButton from '@features/todoFeatures/CreateTodo/components/AddTaskButton';
import RenderedList from '@entities/todos/components/RenderedList';
import {useVisable} from '@shared/hooks';

interface Props {
    todos: ITodo[],
    initialDate?: IDate,
    initialProject?: string,
    noAddButton?:boolean,
}

// eslint-disable-next-line react/display-name
const TodoList = memo(({todos, initialDate, initialProject, noAddButton = false}: Props) => {
  const [isOpenForm, openForm, closeForm] = useVisable(false);

  const form = isOpenForm ? (
          <Box mt={'20px'}>
            <CreateTodoForm onClose={closeForm} initialDate={initialDate} initialProject={initialProject}/>
          </Box>
      ) : !noAddButton && <AddTaskButton onCreate={openForm}/>

  return (
    <Box mt={'20px'} paddingBottom={'20px'}>
      <RenderedList todos={todos}/>
      {form}
    </Box>
  );
});

export default TodoList;
