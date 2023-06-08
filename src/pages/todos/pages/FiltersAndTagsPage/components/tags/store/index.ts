import {createSlice} from '@reduxjs/toolkit';
import {getBoolValueFromLocalStorage} from '@shared/helpers';

export const isOpenTagList = getBoolValueFromLocalStorage('isTagListOpen')

const tagListSlice = createSlice({
  name: 'tagList',
  initialState: {isOpenTagList},
  reducers: {
    toggleTagListOpen: (state) => {
      state.isOpenTagList = !state.isOpenTagList
    },
  },
})

export const {toggleTagListOpen} = tagListSlice.actions;
export const tagListReducer = tagListSlice.reducer;
