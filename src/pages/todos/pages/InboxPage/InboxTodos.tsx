import React from 'react';
import {useSelector} from 'react-redux';
import {Box} from '@mui/material';

import NoInboxTodos from './NoInboxTodos';
import {RootReducer} from '@app/store';
import {overdueDate} from '@shared/constants';
import {
  OverdueTodos,
  TodoList,
  PageTitle} from '../../components';

import {useVisable} from '@shared/hooks';
import {CreateTodoForm} from '@features/CreateOrEditTodo';


const InboxTodosPage = () => {
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const [isOpenForm, openForm, closeForm] = useVisable(false);

  if (isOpenForm) {
    return <Box mt={'20px'}>
      <CreateTodoForm onClose={closeForm}/>
    </Box>;
  }

  const overdueTodos = todos.filter((todo) => overdueDate(todo.date!));
  const inboxTodos = todos.filter((todo) => !overdueDate(todo.date!));

  return (
    <Box paddingTop={'30px'} height={'100%'}>
      <OverdueTodos overdueTodos={overdueTodos}/>
      {
        todos.length ? (
          <Box>
            <PageTitle>
                  Inbox
            </PageTitle>
            <TodoList todos={inboxTodos}/>
          </Box>
        ) : (
            <NoInboxTodos onClick={openForm}/>
        )
      }

    </Box>
  );
};
export default InboxTodosPage;
