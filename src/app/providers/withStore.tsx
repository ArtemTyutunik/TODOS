import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
export const withStore = (Wrapped: () => React.ReactElement) => (props: any) =>
  <Provider store={store}>
    <Wrapped {...props}/>
  </Provider>;
