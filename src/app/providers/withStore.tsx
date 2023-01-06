import React from "react";
import {Provider} from "react-redux";
import {store} from "../store";

export const withStore = (Wrapped: () => React.ReactElement) => (props: any) =>
    <Provider store={store}>
        <Wrapped {...props}/>
    </Provider>