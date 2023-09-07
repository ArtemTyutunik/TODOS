import * as React from 'react';
import {PreloadedState} from '@reduxjs/toolkit';
import {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {render, RenderOptions} from '@testing-library/react';
import {ThemeProvider} from '@mui/material';
import theme from '@app/theme';
import {AppMockStore, RootMockState, setupMockStore} from '@test/test-utils/setupStore';
import userEvent from '@testing-library/user-event';


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<PreloadedState<RootMockState>>,
  store?: AppMockStore
}

export default function renderWithProviders(ui: React.ReactElement,
    {
      preloadedState = {},
      store = setupMockStore(preloadedState),
    }: ExtendedRenderOptions = {}) {
  function Wrapper({children}: PropsWithChildren) {
    return <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  }

  const user = userEvent.setup();

  return {store, ...render(ui, {wrapper: Wrapper}), user}
}
