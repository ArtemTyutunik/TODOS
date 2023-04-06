import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@mui/material';
import AppLayout from './ui/appLayout';
import theme from '@app/theme';
import {withStore} from './providers/withStore';
import {useDispatch} from 'react-redux';
import {fetchTasks} from '@entities/todos/store/todo';
import SpinnerComponent from '@app/ui/SpinnerComponent/SpinnerComponent';


const App = () => {
  const dispatch = useDispatch()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchingData = () => new Promise((resolve) => {
      setIsFetching(true)
      fetch('http://localhost:4444/api/get_all')
          .then((res) => res.json())
          .then((res) => resolve(res))
    })

    fetchingData().then((res) => {
      setIsFetching(false)
      dispatch(fetchTasks(res))
    })
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


