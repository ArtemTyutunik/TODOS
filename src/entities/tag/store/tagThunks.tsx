import {createAsyncThunk} from '@reduxjs/toolkit';
import {ITag} from '@shared/interfacesAndTypes';
import {addNewUserTag, deleteTag, resetTag} from '@entities/tag/store/tagStore';
import {toast} from 'react-toastify';
import TagsActionFailed from '@shared/components/Notification/errors/tagsActionsFailed';
import {options} from '@shared/components/Notification/constants';
import {createNewUserTag, deleteUserTag, editUserTag} from '@shared/api/services/tags';

export const createNewUserTagThunk = createAsyncThunk('tag/createNewUserTag',
    async (newTag: ITag, {dispatch}) => {
      try {
        await createNewUserTag(newTag)
        dispatch(addNewUserTag(newTag))
      } catch (e) {
        toast(<TagsActionFailed action={'add'}/>, options)
      }
    })

export const editUserTagThunk = createAsyncThunk('tag/editUserTag',
    async (tag: ITag, {dispatch}) => {
      try {
        await editUserTag(tag)
        dispatch(resetTag(tag))
      } catch (e) {
        toast(<TagsActionFailed action={'edit'}/>, options)
      }
    })

export const deleteUserTagThunk = createAsyncThunk('tag/deleteUserTag',
    async (tagId: string, {dispatch}) => {
      try {
        await deleteUserTag(tagId)
        dispatch(deleteTag(tagId))
      } catch (e) {
        toast(<TagsActionFailed action={'delete'}/>, options)
      }
    })


