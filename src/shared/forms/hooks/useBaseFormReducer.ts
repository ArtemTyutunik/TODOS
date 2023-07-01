import React from 'react';
import {ITodo} from '@shared/interfacesAndTypes';
import {useReducer} from 'react';

const initialStateFunction = (todo?: ITodo, initialProject?: string) => ({
  id: todo?.id || Date.now(),
  label: todo?.label || '',
  description: todo?.description || '',
  tags: todo?.tags || [],
  date: todo?.date || '',
  priority: todo?.priority || '4',
  done: todo?.done || false,
  projectId: todo?.projectId || initialProject || localStorage.getItem('inboxID'),
  isCurrent: todo?.isCurrent || false,
})

interface formAction {
  type: string;
  payload: any;
}

const formReducer = (state: ITodo, action: formAction) => {
  switch (action.type) {
    case 'CHANGE_PRIORITY': return {...state, priority: action.payload}
    case 'CHANGE_PROJECT': return {...state, projectId: action.payload}
    default: return state
  }
}

const useBaseFormReducer = (todo?: ITodo, projectId?: string): [ITodo, React.Dispatch<formAction>] => {
  const [state, dispatchAction] = useReducer(formReducer, initialStateFunction(todo, projectId));

  return [state, dispatchAction]
}

export const changeProjectActionCreator = (projectId: string) => ({
  type: 'CHANGE_PROJECT',
  payload: projectId,
})

export default useBaseFormReducer
