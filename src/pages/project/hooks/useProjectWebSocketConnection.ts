import {IProject, ITodo} from '@shared/interfacesAndTypes';
import useWebsocket, {ReadyState} from 'react-use-websocket';
import {useCallback} from 'react';
import getUserId from '@shared/helpers/getUserId';

export type UpdateFunctionMessage = Partial<IProject> | Partial<ITodo>
export type ReturnUpdateProjectFunction = (message: UpdateFunctionMessage) => void


const useProjectWebSocketConnection = (projectId: IProject['id']): ReturnUpdateProjectFunction => {
  const userId = getUserId();
  const WEB_SOCKET_URL = `ws://localhost:3000/id=${userId}&room=${projectId}`;
  const {sendJsonMessage, readyState} = useWebsocket(WEB_SOCKET_URL)

  return useCallback((message: UpdateFunctionMessage) => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({update: message, type: 'updateProject'})
    }
  }, [readyState])
}

export default useProjectWebSocketConnection
