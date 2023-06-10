import {useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';
import {TODAY} from '@shared/constants';

const useTodosCount = (): {[k: string]: number} => {
  const allTodos = useSelector((state: RootReducer) => state.todosReducer.todos);
  const todayTodos = allTodos.filter((todo) => todo.date === TODAY).length;

  const inboxTodos = allTodos.length;

  return {
    Today: todayTodos,
    Inbox: inboxTodos,
  }
}

export default useTodosCount;
