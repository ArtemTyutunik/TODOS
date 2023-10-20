import {useSelector} from 'react-redux';
import {allTodosSelector, updateTargetTodo} from '@entities/todos/store/todo';
import {useAppDispatch} from '@app/store';
import {IProject, ITodo} from '@shared/interfacesAndTypes';
import {useCallback, useContext, useMemo} from 'react';
import {projectsSelector} from '@entities/projects/model/store';
import {ProjectContext} from '@layouts/athorizedLayout';
import {ProjectWebSocketMessage, WebSocketType} from '@shared/interfacesAndTypes/webSocketConnection';
import {sendUpdatedTodo} from '@shared/api/services/todos';

//if we pass updateProjectTodos it means this todos should update by webSocket

const useTodoApi = (id: ITodo['id']) => {
  const todos = useSelector(allTodosSelector)
  const projects = useSelector(projectsSelector)
  const dispatch = useAppDispatch()
  const {connectProjectToWebSocket} = useContext(ProjectContext)!

  const findTaskById = (id: number) => todos.find((task) => task.id === id)
  const targetTodo = useMemo(() => findTaskById(id), [todos, id]);

  const isTodoInProject = useMemo(() => isTodoInProjectHelper(id, projects), [id, projects])

  const sendApiRequest = useCallback(async (messageInfo: ProjectWebSocketMessage, type: WebSocketType) => {
    if (isTodoInProject) {
      connectProjectToWebSocket(messageInfo, type);
      return;
    }
    await sendUpdatedTodo(messageInfo.data as Partial<ITodo>);
  },
  [isTodoInProject])

  const onComplete = async (computedValue?: boolean) => {
    if (targetTodo) {
      const updatedTodo = {...targetTodo, done: computedValue ?? !targetTodo.done};
      dispatch(updateTargetTodo(updatedTodo));

      const message: ProjectWebSocketMessage = {
        projectId: updatedTodo.projectId,
        id: updatedTodo.id,
        data: {done: updatedTodo.done},
      }

      await sendApiRequest(message, 'update_todo');
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
