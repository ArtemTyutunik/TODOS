import {useSelector} from 'react-redux';
import {useState} from 'react';
import {Box} from '@mui/material';

import {RootReducer} from '../../../../app/store';
import NoTodayTodos from './NoTodayTodos';
import {CreateTodoForm, TodoList} from '../../components';
import {TODAY} from '../../../../shared/constants';


const TodayTodosPage = () => {
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const todayTodos = todos.filter((todo) => todo.date === TODAY);

  const [isOpenForm, setIsOpenForm] = useState(false);

  const onClose = () => {
    setIsOpenForm(false);
  };

  const onOpenForm = () => {
    setIsOpenForm(true);
  };

  if (isOpenForm) {
    return <Box mt={'20px'}>
      <CreateTodoForm onClose={onClose} initialDate={TODAY}/>
    </Box>;
  }

  return (
    <Box paddingTop={'30px'} height={'100%'}>
      {
        todayTodos.length ? (
            <TodoList todos={todayTodos}/>
        ) : (
            <NoTodayTodos onClick={onOpenForm}/>
        )
      }
    </Box>
  );
};

export default TodayTodosPage;
