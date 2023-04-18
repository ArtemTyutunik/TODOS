import React from 'react';
import {Grid, Link} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

interface Props {
    to: string,
    children: React.ReactNode
}

const FromLink = ({to, children}: Props) => {
  return (
    <Grid container>
      <Grid item>
        <Link variant="body2" component = {RouterLink} to = {to}>
          {children}
        </Link>
      </Grid>
    </Grid>
  );
};

export default FromLink;
