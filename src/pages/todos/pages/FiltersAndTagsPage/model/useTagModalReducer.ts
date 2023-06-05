import React from 'react';
import {useReducer} from 'react';
import {ITag} from '@shared/interfacesAndTypes';

const initialState: ITag= {
  name: '',
  settings: {
    name: 'Charcoal',
    background: '#d37171',
    textColor: '#fff',
  },
}

const Reducer = (state: ITag, action: any) => {
  switch (action.type) {
    case 'SET_TAG_NAME': return {...state, name: action.payload}
    case 'SET_TAG_SETTINGS': return {...state, settings: action.payload}
    default:
      return state
  }
}

export const useTagModalReducer = (): [ITag, React.Dispatch<any>] => {
  const [modalState, dispatch] = useReducer(Reducer, initialState)

  return [modalState, dispatch]
}

export const setTagNameAction = (name: string) => ({
  type: 'SET_TAG_NAME',
  payload: name,
})

export const setTagSettingsAction = (settings: ITag['settings']) => ({
  type: 'SET_TAG_SETTINGS',
  payload: settings,
})
