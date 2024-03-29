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


const routesStyles = (isDrawerOpen: boolean) => ({
  'height': '100%',
  'overflow': 'scroll',
  'maxHeight': 'calc(100vh - 56px)',
  'padding': '0',
  'paddingTop': '0 !important',
  'marginLeft': {largeMobile: 0, tablet: isDrawerOpen ? '270px' : 0, laptop: isDrawerOpen ? '350px' : 0},
  'position': 'relative',
})

const AuthorizedLayout = () => {
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);
  const [isFetching] = useFetchAllUserData()
  const errorFetching = useSelector(isErrorFetchingSelector)
  const isVerified = useSelector(isVerifiedSelector)
  const {login = ''} = JSON.parse(localStorage.getItem('user')!)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isVerified === 'unset') {
      getVerifiedStatus(login).then((result) => {
        dispatch(authVerified(result))
        localStorage.setItem('verified', JSON.stringify(result))
      })
    }
  }, [isVerified])

  return (
      isFetching ?
          <SpinnerComponent size={'large'}/> :
    <>
      {errorFetching && <TodosFetchFailed/>}
      {!isVerified && <NotVerified/>}
      <Header/>
      <Box sx={{marginTop: 0}} height={'calc(100vh - 56px)'}>
        <Box paddingTop={'0 !important'}
          position={'absolute'}
          height={'calc(100vh - 56px)'}
          display={isOpenDrawer ? 'block' : 'none'}>
          <LaptopDrawer/>
          <MobileDrawer/>
        </Box>
        <Box sx={routesStyles(isOpenDrawer)}>
          <Box width={{mobile: '100%', largeMobile: '80%'}}
            margin={{mobile: '0', largeMobile: '0 auto'}}
            padding={{mobile: '0 20px', largeMobile: 0}}>
            <Routing/>
          </Box>
        </Box>
      </Box>
      <ToastContainer/>
    </>
  );
};

export default AuthorizedLayout;
