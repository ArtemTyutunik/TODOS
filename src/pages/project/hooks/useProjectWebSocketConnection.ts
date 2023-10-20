import useWebsocket, {ReadyState} from 'react-use-websocket';
import {useCallback} from 'react';
import getUserId from '@shared/helpers/getUserId';
import {
  ProjectWebSocketMessage,
  ReturnUpdateProjectFunction, WebSocketMassage,
  WebSocketType,
} from '@shared/interfacesAndTypes/webSocketConnection';


const useProjectWebSocketConnection = (): ReturnUpdateProjectFunction => {
  const userId = getUserId();
  const WEB_SOCKET_URL = `ws://localhost:3000/id=${userId}`;
  const {sendJsonMessage, readyState, getWebSocket} = useWebsocket(WEB_SOCKET_URL)

  const sendMessage = useCallback((message: ProjectWebSocketMessage, type: WebSocketType) => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage<WebSocketMassage>({payload: message, type: type})
    }
  }, [readyState])

  return [sendMessage, getWebSocket]
}

export default useProjectWebSocketConnection
