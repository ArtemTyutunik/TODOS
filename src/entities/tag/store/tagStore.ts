import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    getUserTags: (state, {payload}: PayloadAction<ITag[]>) => {
      return {...state, tags: [...payload]}
    },
    addNewUserTag: (state, {payload}: PayloadAction<ITag>) => {
      return {...state, tags: [...state.tags, payload]}
    },
    deleteTag: (state, {payload}: PayloadAction<string>) => {
      return {...state, tags: [...state.tags.filter((tag) => tag.id !== payload)]}
    },
    resetTag: (state, {payload}: PayloadAction<ITag>) => {
      const tagIndex = state.tags.findIndex((tag) => {
        return tag.id === payload.id
      })
      if (tagIndex !== -1) {
        return {...state,
          tags: [...state.tags.slice(0, tagIndex), {...payload}, ...state.tags.slice(tagIndex + 1)]}
      } else {
        return state
      }
    },
  },
})

export const tagReducer = tagSlice.reducer;

export const {getUserTags, addNewUserTag, deleteTag, resetTag} = tagSlice.actions

export const userTagsSelector = (state: RootReducer) => state.tagReducer.tags
