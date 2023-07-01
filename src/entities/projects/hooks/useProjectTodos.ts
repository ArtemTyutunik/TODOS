import {useMemo} from 'react';
import {IProject, ITodo} from '@shared/interfacesAndTypes';
import {useSelector} from 'react-redux';

import {allTodosSelector} from '@entities/todos/store/todo';


const useProjectTodos = (id: IProject['id']): ITodo[] => {
  const allTodos = useSelector(allTodosSelector)

  return useMemo(() => {
    return allTodos.filter((todo) => todo.projectId === id)
  }, [allTodos, id])
}

export default useProjectTodos;
