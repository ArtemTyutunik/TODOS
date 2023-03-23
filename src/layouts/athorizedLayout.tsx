import {Box} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import Drawer from '@entities/drawer';
import Routing from '@pages/routes';
import {ToastContainer} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';

const gridItemStyles = (isDrawerOpen: boolean) => ({
  height: '100%',
  overflow: 'scroll',
  maxHeight: 'calc(100vh - 56px)',
  padding: '0',
  paddingTop: '0 !important',
  marginLeft: isDrawerOpen ? 0 : '320px',
  position: 'relative',
})

const AuthorizedLayout= () => {
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);
  return (
    <>
      <Box sx={{marginTop: 0}} height={'calc(100vh - 56px)'}>
        <Box paddingTop={'0 !important'} position={'absolute'} height={'calc(100vh - 56px)'}>
          <Drawer/>
        </Box>
        <Box sx={gridItemStyles(isOpenDrawer)}>
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
