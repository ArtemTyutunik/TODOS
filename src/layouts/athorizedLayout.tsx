import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, createContext} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box} from '@mui/material';

import Routing from '@pages/routes';
import {ResizableDrawer} from '../widgets/drawer';
import {useFetchAllUserData} from '@app/hooks/useFetchAllUserData';
import SpinnerComponent from '@app/../shared/components/SpinnerComponent/SpinnerComponent';
import Header from '../widgets/header/header';
import TodosFetchFailed from '@shared/components/Notification/errors/todosFetchFailed';
import {isErrorFetchingSelector} from '@entities/todos/store/todo';
import {authVerified, isVerifiedSelector} from '@entities/user/model/store';
import NotVerified from '@shared/components/NotVerifed/NotVerified';
import {getVerifiedStatus} from '@shared/api/services/user';
import Resizable from '@shared/components/resizable/Resizable';
import {setTodoInfoId, todoInfoIdSelector} from '@app/store/AppStore';
import InfoBoard from '@pages/todos/pages/InfoBoard/InfoBoard';
import checkIsMobile from '@shared/helpers/isMobile';
import BasicModal from '@shared/components/modal';
import useProjectWebSocketConnection, {UpdateFunctionMessage} from '@pages/project/hooks/useProjectWebSocketConnection';

export const ProjectContext = createContext<null |
    {connectProjectToWebSocket:(message: UpdateFunctionMessage) => void}>(null)

const AuthorizedLayout = () => {
  const [isFetching] = useFetchAllUserData()
  const todoInfoId = useSelector(todoInfoIdSelector)
  const errorFetching = useSelector(isErrorFetchingSelector)
  const isVerified = useSelector(isVerifiedSelector)
  const dispatch = useDispatch()

  //web socket connection
  const [sendMessage] = useProjectWebSocketConnection()


  const todoCardWidth = localStorage.getItem('todoCardWidth') || '25%'
  const isMobile = checkIsMobile()

  useEffect(() => {
    if (isVerified === 'unset') {
      getVerifiedStatus().then((result) => {
        dispatch(authVerified(result))
        localStorage.setItem('verified', JSON.stringify(result))
      })
    }
  }, [isVerified])

  const onCloseTodoInfo = () => {
    dispatch(setTodoInfoId(null))
    localStorage.removeItem('todoInfoId')
  }

  return (
      isFetching ?
          <SpinnerComponent size={'large'}/> :
    <>
      <ProjectContext.Provider value={{connectProjectToWebSocket: sendMessage}}>
        {errorFetching && <TodosFetchFailed/>}
        {!isVerified && <NotVerified/>}
        <Header/>
        <Box sx={{marginTop: 0}} height={'calc(100vh - 56px)'} display={'flex'}>
          <ResizableDrawer/>
          <Box sx={routesStyles}>
            <Box width={{mobile: '100%', largeMobile: '80%'}}
              margin={{mobile: '0', largeMobile: '0 auto'}}
              padding={{mobile: '0 20px', largeMobile: 0}}>
              <Routing/>
            </Box>
          </Box>

          {todoInfoId && (
          isMobile ? (
              <BasicModal open onClose={onCloseTodoInfo}>
                <Box minWidth={{mobile: '300px', largeMobile: '400px', tablet: '700px'}}>
                  <InfoBoard id={todoInfoId}/>
                </Box>
              </BasicModal>
          ) : (
            <Resizable direction={'left'}
              width={todoCardWidth}
              minWidth={400}
              maxWidth={700}
              localStorageItem={'todoCardWidth'}
            >
              <Box sx={{background: 'gray', height: '100%'}}>
                <InfoBoard id={todoInfoId}/>
              </Box>
            </Resizable>
          )
          )}
        </Box>
        <ToastContainer/>
      </ProjectContext.Provider>
    </>
  );
};

const routesStyles = {
  'height': '100%',
  'overflow': 'scroll',
  'maxHeight': 'calc(100vh - 56px)',
  'flex': '1',
  'padding': '0',
  'paddingTop': '0 !important',
  'position': 'relative',
  'flexGrow': 1,
}

export default AuthorizedLayout;
