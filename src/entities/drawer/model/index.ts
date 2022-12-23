import {createSlice} from "@reduxjs/toolkit";

export const useOpenDrawer = () => {
    let currentValue = localStorage.getItem('isSideBarOpen')
    let result;

    if (currentValue == null){
        result = false
    } else result = currentValue !== 'false';

    return result;
}

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {isOpen: useOpenDrawer()},
    reducers:{
        toggleState: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const toggleDrawerAction = drawerSlice.actions.toggleState;
export const drawerReducer = drawerSlice.reducer;