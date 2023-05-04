import {ThemeProvider} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AppLayout from './ui/appLayout';
import theme from '@app/theme';
import {withStore} from './providers/withStore';
import {RootReducer} from '@app/store';


const App = () => {
  const {isAuth} = useSelector((state: RootReducer) => state.userReducer)
  const navigate = useNavigate()

  useEffect(()=> {
    if (!isAuth) {
      localStorage.removeItem('user')
      navigate('login')
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {
        <AppLayout isAuth={isAuth}/>
      }
    </ThemeProvider>
  );
};

export default withStore(App);


