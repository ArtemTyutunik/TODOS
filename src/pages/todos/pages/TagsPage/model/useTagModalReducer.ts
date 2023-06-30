import React from 'react';
import {useReducer} from 'react';
import {ITag} from '@shared/interfacesAndTypes';

type InitialStateType = (tag: ITag | undefined) => ITag

const defaultSettings: ITag['settings'] = {
  name: 'Charcoal',
  background: 'rgb(129 129 130)',
  textColor: '#fff',
}

const initialState: InitialStateType = (tag) => ({
  id: tag?.id || Date.now() + '',
  name: tag?.name || '',
  settings: tag?.settings || defaultSettings,
})

const Reducer = (state: ITag, action: any) => {
  switch (action.type) {
    case 'SET_TAG_NAME': return {...state, name: action.payload}
    case 'SET_TAG_SETTINGS': return {...state, settings: action.payload}
    case 'RESET_TAG_MODAL': return action.payload
    default:
      return state
  }
}

export const useTagModalReducer = (tag?: ITag): [ITag, React.Dispatch<any>] => {
  const [modalState, dispatch] = useReducer(Reducer, initialState(tag))

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

export const resetTagModalAction = (tag?: ITag) => ({
  type: 'RESET_TAG_MODAL',
  payload: tag,
})
