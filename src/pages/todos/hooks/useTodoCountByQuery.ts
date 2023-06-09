import {useSelector} from 'react-redux';
import {allTodosSelector} from '@entities/todos/store/todo';
import {ITodo} from '@shared/interfacesAndTypes';

const useTodosByQuery = (todoKey: 'tags', searchedValue: string): ITodo[] => {
  const allTodos = useSelector(allTodosSelector)

  return allTodos.filter((todo) => todo[todoKey]?.includes(searchedValue))
}

export default useTodosByQuery;
