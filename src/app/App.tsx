import {ThemeProvider} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AppLayout from './ui/appLayout';
import theme from '@app/theme';
import {withStore} from './providers/withStore';
import SpinnerComponent from '@app/ui/SpinnerComponent/SpinnerComponent';
import {useFetchAllTodos} from '@app/hooks/useFetchAllTodos';
import {RootReducer} from '@app/store';


const App = () => {
  const [isFetching, fetchTodos] = useFetchAllTodos();
  const {isAuth} = useSelector((state: RootReducer) => state.userReducer)
  const navigate = useNavigate()

  useEffect(()=> {
    if (!isAuth) {
      localStorage.removeItem('user')
      navigate('login')
    } else {
      fetchTodos()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {
       isFetching ? <SpinnerComponent/> : <AppLayout/>
      }
    </ThemeProvider>
  );
};

export default withStore(App);


