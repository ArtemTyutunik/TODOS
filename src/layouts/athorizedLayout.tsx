import {Grid} from '@mui/material';

import Drawer from '../entities/drawer';
import Routing from '../pages/routes';

const AuthorizedLayout= () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Drawer/>
      </Grid>
      <Grid item xs={6}>
        <Routing/>
      </Grid>
    </Grid>
  );
};

export default AuthorizedLayout;
