import {createAsyncThunk} from '@reduxjs/toolkit';
import {IProject, ProjectModalStateType} from '@shared/interfacesAndTypes';
import {addProjectToUserData, deleteProjectRequest, editProjectRequest} from '@shared/api/services/projects';
import {addNewProject, deleteProject, editProjectAction} from '@entities/projects/model/store';
import {toast} from 'react-toastify';
import {Box} from '@mui/material';
import {errorOptions} from '@shared/components/Notification/constants';
import {addToMembers} from '@shared/api/services/user';

interface addNewProjectThunkArgs {
    project: ProjectModalStateType,
    callback: (id: string) => void
}

export const addNewProjectThunk = createAsyncThunk(
    'project/addNewProject',
    async (args: addNewProjectThunkArgs, {dispatch}) => {
      try {
        const response = await addProjectToUserData(args.project)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const project = await response.json()
        dispatch(addNewProject(project))
        args.callback(project.id)
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

interface DeleteProjectOptions {
    id: string,
    callback: () => void
}
export const deleteProjectThunk = createAsyncThunk(
    'project/deleteProject',
    async (options: DeleteProjectOptions, {dispatch}) => {
      try {
        dispatch(deleteProject(options.id))
        await deleteProjectRequest(options.id)
        options.callback()
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

export const addMemberToProjectThunk = createAsyncThunk(
    'project/addMemberToProject',
    async ({projectId, userId, project}: {projectId: string, userId: string, project: IProject}, {dispatch}) => {
      try {
        await addToMembers(userId, projectId)
        dispatch(addNewProject(project))
      } catch (e) {
        console.log(e)
      }
    },
)

