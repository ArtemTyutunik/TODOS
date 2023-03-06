import {Grid} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import Drawer from '@entities/drawer';
import Routing from '@pages/routes';
import {ToastContainer} from 'react-toastify';

const GridItemStyles = {
  overflow: 'scroll',
  maxHeight: 'calc(100vh - 56px)',
  padding: '0 260px',
  paddingTop: '0 !important',
}

const AuthorizedLayout= () => {
  return (
    <>
      <Grid container spacing={1} sx={{marginTop: 0}} height={'calc(100vh - 64px)'}>
        <Grid item xs={3} paddingTop={'0 !important'}>
          <Drawer/>
        </Grid>
        <Grid item xs={9} sx={GridItemStyles} >
          <Routing/>
        </Grid>
      </Grid>
      <ToastContainer/>
    </>
  );
};

export default AuthorizedLayout;
