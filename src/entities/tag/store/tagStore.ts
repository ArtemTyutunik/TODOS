import {createSlice} from '@reduxjs/toolkit';
import {ITag} from '@shared/interfacesAndTypes';
import {RootReducer} from '@shared/interfacesAndTypes';

interface IInitialTagStore {
    tags: ITag[]
}

const initialState: IInitialTagStore = {
  tags: [],
}

const tagSlice = createSlice({
  name: 'tag',
  initialState: initialState,
  reducers: {
    getUserTags: (state, action) => {
      return {...state, tags: [...action.payload]}
    },
    addNewUserTag: (state, action) => {
      return {...state, tags: [...state.tags, action.payload]}
    },
    deleteTag: (state, action) => {
      return {...state, tags: [...state.tags.filter((tag) => tag.name !== action.payload)]}
    },
  },
})

export const tagReducer = tagSlice.reducer;

export const {getUserTags, addNewUserTag, deleteTag} = tagSlice.actions

export const userTagsSelector = (state: RootReducer) => state.tagReducer.tags
