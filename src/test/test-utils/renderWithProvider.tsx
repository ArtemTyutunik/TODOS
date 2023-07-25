import * as React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import * as reducers from '@app/store/reducers'
import {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import {ThemeProvider} from '@mui/material';
import theme from '@app/theme';
import {IUser} from '@shared/interfacesAndTypes';

export default function renderWithProviders(ui: React.ReactElement, ...renderOptions: any[]) {
  const userAccount: Partial<IUser> = {
    login: 'testUser@gmail.com',
    accessToken: '',
    name: 'test user name',
    user_id: 'test user id',
    picture: 'test picture url',
  }

  localStorage.setItem('user', JSON.stringify(userAccount))
  const mockStore = configureStore({
    reducer: {...reducers},
    preloadedState: {},
  })

  function Wrapper({children}: PropsWithChildren) {
    return <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  }

  return {...render(ui, {wrapper: Wrapper, ...renderOptions}), mockStore}
}
