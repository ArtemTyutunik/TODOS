import {RootReducer} from '@app/store';

export interface ITodo {
    label: string,
    id: TodoId,
    description: string,
    done: boolean,
    priority: Priority,
    tags: tagIdType[],
    date?: IDate
    projectId?: todoProjectId
    isCurrent?: boolean
}

export type todoProjectId = string
export type TodoId = number
export type Priority = '1' | '2' | '3'| '4'
export type IDate = string | undefined
export type Anchor = null | HTMLElement

export type IUser = {
    accessToken: string,
    emailIsVerified: boolean,
    login: string,
    picture?: string,
    name?: string,
    todos: ITodo[],
    user_id: string
}

export type ITag = {
    id: tagIdType,
    name: string,
    settings: colorType
}

export type colorType = {
    name: string,
    background: string,
    textColor?: string,
}

export type IFavorite = {
    type: 'tag' | 'filter',
    itemId: string,
}

export type {
  RootReducer,
}

export interface IProject {
    name: string,
    id: todoProjectId,
    color: colorType
    isPinned?: boolean
}

export type tagIdType = string;

