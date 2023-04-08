import {ThemeProvider} from '@mui/material';
import AppLayout from './ui/appLayout';
import theme from '@app/theme';
import {withStore} from './providers/withStore';
import SpinnerComponent from '@app/ui/SpinnerComponent/SpinnerComponent';
import {useFetchAllTodos} from '@app/hooks/useFetchAllTodos';


const App = () => {
  const [isFetching] = useFetchAllTodos();

  return (
    <ThemeProvider theme={theme}>
      {
       isFetching ? <SpinnerComponent/> : <AppLayout/>
      }
    </ThemeProvider>
  );
};

export default withStore(App);


