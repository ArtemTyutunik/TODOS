import React from 'react';
import {ThemeProvider} from '@mui/material';
import AppLayout from './ui/appLayout';
import theme from '@app/theme';
import {withStore} from './providers/withStore';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout/>
    </ThemeProvider>
  );
};

export default withStore(App);
