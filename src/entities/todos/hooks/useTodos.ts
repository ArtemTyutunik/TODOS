import {useSelector} from 'react-redux';
import {allTodosSelector, updateTargetTodo} from '@entities/todos/store/todo';
import {useAppDispatch} from '@app/store';
import {IProject, ITodo} from '@shared/interfacesAndTypes';
import {useCallback, useContext, useMemo} from 'react';
import {projectsSelector} from '@entities/projects/model/store';
import {ProjectContext} from '@layouts/athorizedLayout';

//if we pass updateProjectTodos it means this todos should update by webSocket

const useTodoApi = (id: ITodo['id']) => {
  const todos = useSelector(allTodosSelector)
  const projects = useSelector(projectsSelector)
  const dispatch = useAppDispatch()
  const {connectProjectToWebSocket} = useContext(ProjectContext)!

  const findTaskById = (id: number) => todos.find((task) => task.id === id)
  const targetTodo = useMemo(() => findTaskById(id), [todos, id]);

  const isTodoInProject = useMemo(() => isTodoInProjectHelper(id, projects), [id, projects])

  const sendUpdatedTodo = useCallback(async (updatedTodo: ITodo) => {
    if (isTodoInProject) {
      connectProjectToWebSocket(updatedTodo);
      return;
    }
    await sendUpdatedTodo(updatedTodo);
  }, [isTodoInProject])

  const onComplete = async (computedValue?: boolean) => {
    if (targetTodo) {
      const updatedTodo = {...targetTodo, done: computedValue ?? !targetTodo.done};
      dispatch(updateTargetTodo(updatedTodo));
      await sendUpdatedTodo(updatedTodo);
    }
  }

  return {
    onComplete,
  }
}

const isTodoInProjectHelper = (id: ITodo['id'], projects: IProject[]): boolean => {
  for (const project of projects) {
    if (project.todos.find((todo) => todo.id === id)) {
      return true;
    }
  }

  return false;
}

export interface ITodoApi {
  onComplete: (computedValue?: boolean) => void
}


export default useTodoApi
