import {createAsyncThunk} from '@reduxjs/toolkit';
import {IProject} from '@shared/interfacesAndTypes';
import {addProjectToUserData, deleteProjectRequest, editProjectRequest} from '@shared/api/services/projects';
import {addNewProject, deleteProject, editProjectAction} from '@entities/projects/model/store';
import {toast} from 'react-toastify';
import {Box} from '@mui/material';
import {errorOptions} from '@shared/components/Notification/constants';
import {updateTodos} from '@entities/todos/store/todo';


export const addNewProjectThunk = createAsyncThunk(
    'project/addNewProject',
    async (project: IProject, {dispatch}) => {
      try {
        const response = await addProjectToUserData(project)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        dispatch(addNewProject(project))
      } catch (e) {
        toast.error(<Box>There is a problem to create project. Try later</Box>, errorOptions)
      }
    },
);

export const editProjectThunk = createAsyncThunk(
    'project/editProject',
    async (project: IProject, {dispatch}) => {
      try {
        const response = await editProjectRequest(project)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        dispatch(editProjectAction(project))
      } catch (e) {
        toast.error(<Box>There is a problem</Box>, errorOptions)
      }
    },
);

export const deleteProjectThunk = createAsyncThunk(
    'project/deleteProject',
    async (id: string, {dispatch}) => {
      try {
        const returnedTodos = await deleteProjectRequest(id)
        dispatch(deleteProject(id))
        dispatch(updateTodos(returnedTodos))
      } catch (e) {
        console.log(e)
      }
    })

export const pinProjectThunk = createAsyncThunk(
    'project/pinProject',
    async (newProject: IProject, {dispatch}) => {
      try {
        await editProjectRequest(newProject)
        dispatch(editProjectAction(newProject))
      } catch (e) {
        console.log(e)
      }
    },
)

