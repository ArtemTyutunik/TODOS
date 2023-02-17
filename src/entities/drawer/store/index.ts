import {createSlice} from '@reduxjs/toolkit';
import {getBoolValueFromLocalStorage} from '../../../shared/helpers';

export const isOpenDrawer = getBoolValueFromLocalStorage('isDrawerOpen')

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {isOpenDrawer},
  reducers: {
    toggleDrawerOpen: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer
    },
  },
})

export const {toggleDrawerOpen} = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;
