import React from 'react';
import {toast} from 'react-toastify';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ITodo} from '@shared/interfacesAndTypes';
import {
  addNewTask,
  deleteTask,
  editTask,
  setIsLoading,
  setPriority,
} from '@entities/todos/store/todo';
import {deleteTodoById, postNewTodo, sendUpdatedTodo} from '@shared/api/services/todos';
import {TodoEditedNotification} from '@shared/components/Notification';
import {options} from '@shared/components/Notification/constants';
import TodoCreatedNotification from '../../../shared/components/Notification/TodoCreated';

export const addNewTaskThunk = createAsyncThunk(
    'todo/addNewTask',
    async (newTodo: ITodo, {dispatch}) => {
      try {
        dispatch(setIsLoading(true))
        await postNewTodo(newTodo)
        dispatch(addNewTask(newTodo));
        dispatch(setIsLoading(true))
        toast(<TodoCreatedNotification/>, options)
      } catch (e) {
        console.log(e)
      }
    },
)

export const editTaskThunk = createAsyncThunk(
    'todo/editTask',
    async ({updatedTodo, showNotification = false}: {updatedTodo: ITodo, showNotification?: boolean}, {dispatch}) => {
      try {
        await sendUpdatedTodo(updatedTodo)
        dispatch(editTask(updatedTodo));
        if (showNotification) {
          toast(<TodoEditedNotification/>, options)
        }
      } catch (e) {
        console.log(e)
      }
    },
)

export const deleteTaskThunk = createAsyncThunk(
    'todo/deleteTask',
    async (id: ITodo['id'], {dispatch}) => {
      try {
        await deleteTodoById(id)
        dispatch(deleteTask(id));
      } catch (e) {
        console.log(e)
      }
    },
)

export const duplicateTaskThunk = createAsyncThunk(
    'todo/duplicateTask',
    async (newTodo: ITodo, {dispatch}) => {
      try {
        await postNewTodo(newTodo)
        dispatch(addNewTask(newTodo));
      } catch (e) {
        console.log(e)
      }
    },
)

export const setPriorityTaskThunk = createAsyncThunk(
    'todo/setPriority',
    async (newTodo: {priority: ITodo['priority'], id: ITodo['id']}, {dispatch}) => {
      try {
        await sendUpdatedTodo(newTodo)
        dispatch(setPriority(newTodo));
      } catch (e) {
        console.log(e)
      }
    },
)
