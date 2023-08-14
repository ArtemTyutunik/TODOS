import React from 'react';
import {toast} from 'react-toastify';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ITodo} from '@shared/interfacesAndTypes';
import {editTask} from '@entities/todos/store/todo';
import {sendUpdatedTodo} from '@shared/api/services/todos';
import {TodoEditedNotification} from '@shared/components/Notification';
import {options} from '@shared/components/Notification/constants';


export const editTaskThunk = createAsyncThunk(
    'todo/editTask',
    async (updatedTodo: ITodo, {dispatch}) => {
      try {
        await sendUpdatedTodo(updatedTodo)
        dispatch(editTask(updatedTodo));
        toast(<TodoEditedNotification/>, options)
      } catch (e) {
        console.log(e)
      }
    },
)
