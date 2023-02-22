import {Grid} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import Drawer from '../entities/drawer';
import Routing from '../pages/routes';
import {ToastContainer} from 'react-toastify';

const AuthorizedLayout= () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Drawer/>
        </Grid>
        <Grid item xs={6}>
          <Routing/>
        </Grid>
      </Grid>
      <ToastContainer/>
    </>
  );
};

export default AuthorizedLayout;
