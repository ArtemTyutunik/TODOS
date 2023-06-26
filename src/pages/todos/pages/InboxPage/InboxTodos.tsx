import React from 'react';
import {Box} from '@mui/material';
import {overdueDate} from '@shared/constants';
import {
  OverdueTodos,
  TodoList,
  PageTitle} from '../../components';

import {useSelector} from 'react-redux';
import {allTodosSelector} from '@entities/todos/store/todo';


const InboxTodosPage = () => {
  const inboxId = localStorage.getItem('inboxID');
  // fixme
  if (!inboxId) return null

  const allTodos = useSelector(allTodosSelector);
  const inboxTodos = allTodos.filter((todo) => todo.projectId === inboxId)

  const overdueTodos = inboxTodos.filter((todo) => overdueDate(todo.date!) && !todo.done);
  const renderedTodos = inboxTodos.filter((todo) => !overdueDate(todo.date!) || todo.done);

  return (
    <Box paddingTop={'30px'} height={'100%'}>
      <OverdueTodos overdueTodos={overdueTodos}/>
      <Box>
        <PageTitle>
                    Inbox
        </PageTitle>
        <TodoList todos={renderedTodos}/>
      </Box>
    </Box>

  );
};
export default InboxTodosPage;
