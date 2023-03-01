import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Box} from '@mui/material';

import NoInboxTodos from './NoInboxTodos';
import {RootReducer} from '@app/store';
import {overdueDate} from '@shared/constants';
import {
  OverdueTodos,
  CreateTodoForm,
  TodoList,
  PageTitle} from '../../components';


const InboxTodosPage = () => {
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const onClose = () => {
    setIsOpenForm(false);
  };

  const onOpenForm = () => {
    setIsOpenForm(true);
  };

  if (isOpenForm) {
    return <Box mt={'20px'}>
      <CreateTodoForm onClose={onClose}/>
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
                    <NoInboxTodos onClick={onOpenForm}/>
                )
      }

    </Box>
  );
};
export default InboxTodosPage;
