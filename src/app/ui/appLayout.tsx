import AuthorizedLayout from '@layouts/athorizedLayout';
import UnauthorizedLayout from '@layouts/unathorizedLayout';
import {memo} from 'react';
import {Box} from '@mui/material';

const AppLayout = ({isAuth}: {isAuth: boolean}) => {
  return <Box sx={(theme) => ({backgroundColor: theme.background.appBackground})}>
    {
      isAuth ? <>
        <AuthorizedLayout/>
      </> : <UnauthorizedLayout/>
    }
  </Box>
};

export default memo(AppLayout);
