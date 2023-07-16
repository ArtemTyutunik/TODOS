import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootReducer} from '@app/store/index';

interface IInitialSetup {
    sortType: string,
    order: 'ascending' | 'descending'
}
const initialSetup: IInitialSetup = {
  sortType: localStorage.getItem('sorting') || 'default',
  order: localStorage.getItem('ordering') as IInitialSetup['order'] || 'ascending',
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
  },
})


export const appSetupReducer = appSetup.reducer

export const sortTypeSelector = (state: RootReducer) => state.appSetupReducer.sortType
export const orderSelector = (state: RootReducer) => state.appSetupReducer.order
export const {setSortingValue, toggleOrder} = appSetup.actions
