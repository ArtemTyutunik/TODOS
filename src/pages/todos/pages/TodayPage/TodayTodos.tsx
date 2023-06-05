import {useSelector} from 'react-redux';
import {Box} from '@mui/material';

import {RootReducer} from '@shared/interfacesAndTypes';
import {CreateTodoForm} from '@features/todoFeatures/CreateTodo';
import NoTodayTodos from './NoTodayTodos';
import {TodoList} from '../../components';
import {TODAY} from '@shared/constants';
import {useVisable} from '@shared/hooks';


const TodayTodosPage = () => {
  const todos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const todayTodos = todos.filter((todo) => todo.date === TODAY);

  const [isOpenForm, openForm, closeForm] = useVisable(false);

  if (isOpenForm) {
    return <Box mt={'20px'}>
      <CreateTodoForm onClose={closeForm} initialDate={TODAY}/>
    </Box>;
  }

  return (
    <Box paddingTop={'30px'} height={'100%'}>
      {
        todayTodos.length ? (
            <TodoList todos={todayTodos} initialDate={TODAY}/>
        ) : (
            <NoTodayTodos onClick={openForm}/>
        )
      }
    </Box>
  );
};

export default TodayTodosPage;
