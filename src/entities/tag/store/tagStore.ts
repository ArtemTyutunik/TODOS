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
      return {...state, tags: [...state.tags.filter((tag) => tag.id !== action.payload)]}
    },
    resetTag: (state, action) => {
      const tagIndex = state.tags.findIndex((tag) => {
        return tag.id === action.payload.id
      })
      if (tagIndex !== -1) {
        return {...state,
          tags: [...state.tags.slice(0, tagIndex), {...action.payload}, ...state.tags.slice(tagIndex + 1)]}
      } else {
        return {...state}
      }
    },
  },
})

export const tagReducer = tagSlice.reducer;

export const {getUserTags, addNewUserTag, deleteTag, resetTag} = tagSlice.actions

export const userTagsSelector = (state: RootReducer) => state.tagReducer.tags
