import React from 'react';
import {Box} from '@mui/material';
import {overdueDate} from '@shared/constants';
import {
  OverdueTodos,
  TodoList,
  PageTitle} from '../../components';
import {useProjectTodos} from '@entities/projects';


const InboxTodosPage = () => {
  const inboxId = localStorage.getItem('inboxID');
  // fixme
  if (!inboxId) return null

  const inboxTodos = useProjectTodos(inboxId)

  const overdueTodos = inboxTodos.filter((todo) => overdueDate(todo.date!) && !todo.done);
  const renderedTodos = inboxTodos.filter((todo) => !overdueDate(todo.date!) || todo.done);

  console.log(inboxTodos)
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
