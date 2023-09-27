import {ThemeProvider} from '@mui/material';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AppLayout from './ui/appLayout';
import theme from '@app/theme';
import {withStore} from './providers/withStore';
import {RootReducer} from '@shared/interfacesAndTypes';
import registerServiceWorker from '../../registerServiceWorker';


const App = () => {
  const {isAuth} = useSelector((state: RootReducer) => state.userReducer)

  useEffect(() => {
    registerServiceWorker()
  }, []);

  useEffect(()=> {
    if (!isAuth) {
      localStorage.removeItem('user')
    }
  }, [isAuth])

  return (
    <ThemeProvider theme={theme}>
      {
        <AppLayout isAuth={isAuth}/>
      }
    </ThemeProvider>
  );
};

export default withStore(App);
