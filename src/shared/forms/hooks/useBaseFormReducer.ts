import React from 'react';
import {IDate, ITodo} from '@shared/interfacesAndTypes';
import {useReducer} from 'react';

type Options = {
  todoProjectId?: string,
  initialDate?: string
  initialTag: ITodo['tags'],
}


const initialStateFunction = (todo?: ITodo, options?: Options) => ({
  id: todo?.id || Date.now(),
  label: todo?.label || '',
  description: todo?.description || '',
  tags: todo?.tags || options?.initialTag || [],
  date: todo?.date || options?.initialDate || '',
  priority: todo?.priority || '4',
  done: todo?.done || false,
  projectId: todo?.projectId || options?.todoProjectId || localStorage.getItem('inboxID'),
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
    case 'CHANGE_DATE': return {...state, date: action.payload}
    default: return state
  }
}


const useBaseFormReducer = (todo?: ITodo, options?: Options): [ITodo, React.Dispatch<formAction>] => {
  const [state, dispatchAction] = useReducer(formReducer, initialStateFunction(todo, options));

  return [state, dispatchAction]
}

export const changeProjectActionCreator = (projectId: string) => ({
  type: 'CHANGE_PROJECT',
  payload: projectId,
})

export const changeDateActionCreator = (date: IDate) => ({
  type: 'CHANGE_DATE',
  payload: date,
})

export default useBaseFormReducer
