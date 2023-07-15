import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootReducer} from '@app/store/index';

interface IInitialSetup {
    sortType: string
}
const initialSetup: IInitialSetup = {
  sortType: localStorage.getItem('sorting') || 'default',
}


const appSetup = createSlice({name: 'app',
  initialState: initialSetup,
  reducers: {
    setSortingValue: (state, {payload}: PayloadAction<string>) => {
      return {...state, sortType: payload}
    },
  },
})


export const appSetupReducer = appSetup.reducer

export const sortTypeSelector = (state: RootReducer) => state.appSetupReducer.sortType

export const {setSortingValue} = appSetup.actions
