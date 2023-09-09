import React from 'react';
import {useReducer} from 'react';
import {IProject} from '@shared/interfacesAndTypes';

type InitialStateType = (project?: Partial<IProject>) => IProject

const defaultSettings: IProject['color'] = {
  name: 'Charcoal',
  background: 'rgb(129 129 130)',
}

const initialState: InitialStateType = (IProject) => ({
  id: IProject?.id || Date.now() + '',
  name: IProject?.name || '',
  color: IProject?.color || defaultSettings,
  isPinned: IProject?.isPinned || false,
})

const Reducer = (state: IProject, action: any) => {
  switch (action.type) {
    case 'SET_PROJECT_NAME': return {...state, name: action.payload}
    case 'SET_PROJECT_COLOR': return {...state, color: action.payload}
    default:
      return state
  }
}

const useProjectState = (project?: IProject): [IProject, React.Dispatch<any>] => {
  const [modalState, dispatch] = useReducer(Reducer, initialState(project))

  return [modalState, dispatch]
}

export const setProjectNameAction = (value: string) => ({
  type: 'SET_PROJECT_NAME',
  payload: value,
})

export const setColorAction = (newColor: IProject['color']) => ({
  type: 'SET_PROJECT_COLOR',
  payload: newColor,
})

export default useProjectState;

