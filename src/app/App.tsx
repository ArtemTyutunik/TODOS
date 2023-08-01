import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AppLayout from './ui/appLayout';
import {getDesignTokens} from '@app/theme';
import {withStore} from './providers/withStore';
import {RootReducer} from '@shared/interfacesAndTypes';
import {themeModeSelector} from '@app/store/AppStore';


const App = () => {
  const {isAuth} = useSelector((state: RootReducer) => state.userReducer)
  const themeMode = useSelector(themeModeSelector);

  useEffect(()=> {
    if (!isAuth) {
      localStorage.removeItem('user')
    }
  }, [isAuth])

  const theme = React.useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode])
  console.log(theme)
  return (
    <ThemeProvider theme={theme}>
      {
        <AppLayout isAuth={isAuth}/>
      }
    </ThemeProvider>
  );
};

export default withStore(App);


