import {IProject, ITodo} from '@shared/interfacesAndTypes';
import useWebsocket, {ReadyState} from 'react-use-websocket';
import {useCallback} from 'react';
import getUserId from '@shared/helpers/getUserId';
import {WebSocketLike} from 'react-use-websocket/dist/lib/types';

export type UpdateFunctionMessage = Partial<IProject> | Partial<ITodo>
export type ReturnUpdateProjectFunction = [(message: UpdateFunctionMessage) => void, () => (WebSocketLike | null)]


const useProjectWebSocketConnection = (): ReturnUpdateProjectFunction => {
  const userId = getUserId();
  const WEB_SOCKET_URL = `ws://localhost:3000/id=${userId}`;
  const {sendJsonMessage, readyState, getWebSocket} = useWebsocket(WEB_SOCKET_URL)

  const sendMessage = useCallback((message: UpdateFunctionMessage) => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({update: message, type: 'updateProject'})
    }
  }, [readyState])

  return [sendMessage, getWebSocket]
}

export default useProjectWebSocketConnection
