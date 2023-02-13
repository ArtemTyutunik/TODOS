import {createSlice} from '@reduxjs/toolkit';

export const openDrawer = () => {
  const currentValue = localStorage.getItem('isDrawerOpen')
  if (currentValue === null) return false

  return currentValue !== 'false'
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {isOpen: openDrawer()},
  reducers: {
    toggleDrawerOpen: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const {toggleDrawerOpen} = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;
