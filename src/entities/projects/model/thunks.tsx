import {createAsyncThunk} from '@reduxjs/toolkit';
import {IProject} from '@shared/interfacesAndTypes';
import {addProjectToUserData, editProjectRequest} from '@shared/api/services/projects';
import {addNewProject, editProjectAction} from '@entities/projects/model/store';
// import {toast} from 'react-toastify';
// import {Box} from '@mui/material';
//import {errorOptions} from '@shared/components/Notification/constants';

const {user_id: userId} = JSON.parse(localStorage.getItem('user') || '{}');

export const addNewProjectThunk = createAsyncThunk(
    'project/addNewProject',
    async (project: IProject, {dispatch}) => {
      try {
        if (!userId) throw new Error('no user id')
        const response = await addProjectToUserData(project, userId)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        console.log('here')
        dispatch(addNewProject(project))
      } catch (e) {
        //toast.error(<Box>There is a problem to create project. Try later</Box>, errorOptions)
      }
    },
);

export const editProjectThunk = createAsyncThunk(
    'project/editProject',
    async (project: IProject, {dispatch}) => {
      try {
        if (!userId) throw new Error('no user id')
        const response = await editProjectRequest(userId, project)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        dispatch(editProjectAction(project))
      } catch (e) {
        //toast.error(<Box>There is a problem</Box>, errorOptions)
      }
    },
);

