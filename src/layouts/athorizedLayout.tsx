import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box} from '@mui/material';

import Routing from '@pages/routes';
import {RootReducer} from '@shared/interfacesAndTypes';
import {LaptopDrawer, MobileDrawer} from '../widgets/drawer';
import {useFetchAllUserData} from '@app/hooks/useFetchAllUserData';
import SpinnerComponent from '@app/../shared/components/SpinnerComponent/SpinnerComponent';
import Header from '../widgets/header/header';
import TodosFetchFailed from '@shared/components/Notification/errors/todosFetchFailed';
import {isErrorFetchingSelector} from '@entities/todos/store/todo';
import {authVerified, isVerifiedSelector} from '@entities/user/model/store';
import NotVerified from '@shared/components/NotVerifed/NotVerified';
import {useEffect} from 'react';
import {getVerifiedStatus} from '@shared/api/services/user';
import Resizable from '@shared/components/resizable/Resizable';
import {setTodoInfoId, todoInfoIdSelector} from '@app/store/AppStore';
import InfoBoard from '@pages/todos/pages/InfoBoard/InfoBoard';
import checkIsMobile from '@shared/helpers/isMobile';
import BasicModal from '@shared/components/modal';

const AuthorizedLayout = () => {
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);
  const todoInfoId = useSelector(todoInfoIdSelector)
  const [isFetching] = useFetchAllUserData()
  const errorFetching = useSelector(isErrorFetchingSelector)
  const isVerified = useSelector(isVerifiedSelector)
  const {login = ''} = JSON.parse(localStorage.getItem('user')!)
  const dispatch = useDispatch()

  const drawerWidth = localStorage.getItem('drawerWidth') || '320px'
  const todoCardWidth = localStorage.getItem('todoCardWidth') || '25%'
  const isMobile = checkIsMobile()

  useEffect(() => {
    if (isVerified === 'unset') {
      getVerifiedStatus(login).then((result) => {
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
      {errorFetching && <TodosFetchFailed/>}
      {!isVerified && <NotVerified/>}
      <Header/>
      <Box sx={{marginTop: 0}} height={'calc(100vh - 56px)'} display={'flex'}>
        {isOpenDrawer && <Resizable
          width={drawerWidth}
          direction={'right'}
          localStorageItem={'drawerWidth'}
        >
          <Box paddingTop={'0 !important'}
            position={'unset'}
            width={'100%'}
            height={'calc(100vh - 56px)'}
          >
            <LaptopDrawer/>
            <MobileDrawer/>
          </Box>
        </Resizable>
        }

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
