import AuthorizedLayout from '@layouts/athorizedLayout';
import UnauthorizedLayout from '@layouts/unathorizedLayout';
import {memo} from 'react';
import {Box, useTheme} from '@mui/material';
import {themeModeSelector} from '@app/store/AppStore';
import {useSelector} from 'react-redux';


const AppLayout = ({isAuth}: {isAuth: boolean}) => {
  const themeMode = useSelector(themeModeSelector);
  const theme = useTheme()
  return <Box sx={{backgroundColor: themeMode === 'dark' ? theme.background.dark :
        theme.background.paper}}>
    {
      isAuth ? <>
        <AuthorizedLayout/>
      </> : <UnauthorizedLayout/>
    }
  </Box>
};

export default memo(AppLayout);
