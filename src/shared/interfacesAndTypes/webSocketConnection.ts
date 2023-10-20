import {IProject, ITodo} from '@shared/interfacesAndTypes/index';
import {WebSocketLike} from 'react-use-websocket/dist/lib/types';


export type WebSocketType = 'update_todo' | 'delete_todo' | 'add_todo' | 'update_project' | 'delete_project'

export interface ProjectWebSocketMessage {
    projectId: IProject['id'],
    id: ITodo['id'] | IProject['id'],
    data: Partial<IProject> | Partial<ITodo>
}

export type SendWebSocketMassage = (payload: ProjectWebSocketMessage, type: WebSocketType) => void

export type GetProjectWebSocket = () => (WebSocketLike | null)

export type ReturnUpdateProjectFunction = [SendWebSocketMassage, GetProjectWebSocket]

export interface WebSocketMassage {
    payload: ProjectWebSocketMessage,
    type: WebSocketType
}
