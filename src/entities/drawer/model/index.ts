import {createSlice} from "@reduxjs/toolkit";

export const useOpenDrawer = () => {
    let currentValue = localStorage.getItem('isDrawerOpen')
    if (currentValue === null) return false

    return  currentValue !== 'false';
}

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {isOpen: useOpenDrawer()},
    reducers:{
        toggleDrawerOpen: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const {toggleDrawerOpen} = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;