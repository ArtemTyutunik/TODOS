import * as React from 'react';
import {configureStore, PreloadedState} from '@reduxjs/toolkit';
import {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {render, RenderOptions} from '@testing-library/react';
import {createTheme, ThemeProvider} from '@mui/material';
import {RootReducer} from '@shared/interfacesAndTypes';
import {AppStore} from '@app/store';
import * as reducers from '@app/store/reducers';
import {getDesignTokens} from '@app/theme';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<PreloadedState<RootReducer>>,
  store?: AppStore
}


export default function renderWithProviders(ui: React.ReactElement,
    {
      preloadedState = {},
      store = configureStore({reducer: {...reducers}, preloadedState}),
    }: ExtendedRenderOptions = {}) {
  function Wrapper({children}: PropsWithChildren) {
    const theme = createTheme(getDesignTokens('light'))
    return <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  }

  return {...render(ui, {wrapper: Wrapper}), store}
}
