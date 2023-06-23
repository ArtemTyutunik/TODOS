import React from 'react';
import {ITodo} from '@shared/interfacesAndTypes';
import {useReducer} from 'react';

const initialStateFunction = (todo?: ITodo) => ({
  id: todo?.id || Date.now(),
  label: todo?.label || '',
  description: todo?.description || '',
  tags: todo?.tags || [],
  date: todo?.date || '',
  priority: todo?.priority || '4',
  done: todo?.done || false,
  isCurrent: todo?.isCurrent || false,
})

interface formAction {
  type: string;
  payload: any;
}

const formReducer = (state: ITodo, action: formAction) => {
  switch (action.type) {
    case 'CHANGE_PRIORITY': return {...state, priority: action.payload}
    default: return state
  }
}

const useBaseFormReducer = (todo?: ITodo): [ITodo, React.Dispatch<formAction>] => {
  const [state, dispatchAction] = useReducer(formReducer, initialStateFunction(todo));

  return [state, dispatchAction]
}

export default useBaseFormReducer
