import React from 'react';
import {useReducer} from 'react';
import {IProject, ProjectModalStateType} from '@shared/interfacesAndTypes';

type InitialStateType = (project?: IProject) => ProjectModalStateType

const defaultSettings: IProject['color'] = {
  name: 'Charcoal',
  background: 'rgb(129 129 130)',
}

const initialState: InitialStateType = (IProject) => ({
  name: IProject?.name || '',
  color: IProject?.color || defaultSettings,
})

const Reducer = (state: ProjectModalStateType, action: any) => {
  switch (action.type) {
    case 'SET_PROJECT_NAME': return {...state, name: action.payload}
    case 'SET_PROJECT_COLOR': return {...state, color: action.payload}
    default:
      return state
  }
}

const useProjectModalState = (project?: IProject): [ProjectModalStateType, React.Dispatch<any>] => {
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

export default useProjectModalState;

