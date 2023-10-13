import {useSelector} from 'react-redux';
import {allTodosSelector, updateTargetTodo} from '@entities/todos/store/todo';
import {useAppDispatch} from '@app/store';
import {ITodo} from '@shared/interfacesAndTypes';
import {sendUpdatedTodo} from '@shared/api/services/todos';
import {ReturnUpdateProjectFunction} from '@pages/project/hooks/useProjectWebSocketConnection';
import {useMemo} from 'react';

//if we pass updateProjectTodos it means this todos should update by webSocket

const useTodoActions = (id: ITodo['id'], isWebSocketConnection?: boolean, sendWebSocketUpdate?: ReturnUpdateProjectFunction) => {
  const todos = useSelector(allTodosSelector)
  const dispatch = useAppDispatch()
  const findTaskById = (id: number) => todos.find((task) => task.id === id);

  const targetTodo = useMemo(() => findTaskById(id), [todos, id]);

  const onComplete = async () => {
    if (targetTodo) {
      const updatedTodo = {...targetTodo, done: !targetTodo.done};
      dispatch(updateTargetTodo(updatedTodo));

      if (isWebSocketConnection && sendWebSocketUpdate) {
        sendWebSocketUpdate(updatedTodo);
        return
      }

      await sendUpdatedTodo(updatedTodo);
    }
  }

  return {
    onComplete,
  }
}

export default useTodoActions
