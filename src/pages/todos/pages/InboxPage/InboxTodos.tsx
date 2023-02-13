import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Box, Typography} from '@mui/material';

import NoInboxTodos from './NoInboxTodos';
import TodoList from '../../components/todo-list';
import {RootReducer} from '../../../../app/store';
import CreateTodoForm from '../../components/createTodoForm';
import OverdueTodos from '../../components/OverdueTodos';
import {overdueDate} from '../../../../shared/constants';


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
                          <Typography fontSize={'18px'} fontWeight={'700'} color={'#202020'}>
                                Inbox
                          </Typography>
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
