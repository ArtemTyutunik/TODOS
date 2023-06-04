import React, {memo} from 'react';
import {Box} from '@mui/material';
import {IDate, ITodo} from '@shared/interfaces';
import CreateTodoForm from '@features/CreateOrEditTodo/components/createTodoForm';
import AddTaskButton from '@features/CreateOrEditTodo/components/AddTaskButton';
import useVisable from '@shared/hooks/useVisable';
import RenderedList from '@entities/todos/components/RenderedList';

interface Props {
    todos: ITodo[],
    initialDate?: IDate
}

// eslint-disable-next-line react/display-name
const TodoList = memo(({todos, initialDate}: Props) => {
  const [isOpenForm, openForm, closeForm] = useVisable(false);

  const form = isOpenForm ? (
          <Box mt={'20px'}>
            <CreateTodoForm onClose={closeForm} initialDate={initialDate}/>
          </Box>
      ) : (
        <AddTaskButton onCreate={openForm}/>
      )

  return (
    <Box mt={'20px'} paddingBottom={'20px'}>
      <RenderedList todos={todos}/>
      {form}
    </Box>
  );
});

export default TodoList;
