import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootReducer} from '@app/store/index';

interface IInitialSetup {
    sortType: string,
    order: 'ascending' | 'descending',
    mode: 'dark' | 'light',
}
const initialSetup: IInitialSetup = {
  sortType: localStorage.getItem('sorting') || 'default',
  order: localStorage.getItem('ordering') as IInitialSetup['order'] || 'ascending',
  mode: localStorage.getItem('mode') as IInitialSetup['mode'] || 'dark',
}

const appSetup = createSlice({name: 'app',
  initialState: initialSetup,
  reducers: {
    setSortingValue: (state, {payload}: PayloadAction<string>) => {
      return {...state, sortType: payload}
    },
    toggleOrder: (state, {payload}: PayloadAction<'ascending' | 'descending'>) => {
      return {...state, order: payload}
    },
    toggleMode: (state, {payload}: PayloadAction<'dark' | 'light'>) => {
      return {...state, mode: payload}
    },
  },
})


export const appSetupReducer = appSetup.reducer

export const sortTypeSelector = (state: RootReducer) => state.appSetupReducer.sortType
export const orderSelector = (state: RootReducer) => state.appSetupReducer.order
export const {setSortingValue, toggleOrder, toggleMode} = appSetup.actions
export const themeModeSelector = (state: RootReducer) => state.appSetupReducer.mode
