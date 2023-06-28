import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProject, RootReducer} from '@shared/interfacesAndTypes';

interface InitialState {
  projects: IProject[]
}

const initialState: InitialState = {
  projects: [],
}

const ProjectSlice = createSlice({
  name: 'Projects',
  initialState: initialState,
  reducers: {
    getProjectsAction: (state, {payload}: PayloadAction<IProject[]>) => {
      return {...state, projects: [...payload]}
    },
    addNewProject: (state, {payload}: PayloadAction<IProject>) => {
      return {...state, projects: [...state.projects, payload]}
    },
    deleteProject: (state, {payload}: PayloadAction<IProject['id']> ) => {
      return {...state,
        projects: state.projects.filter((proj) => proj.id !== payload)}
    },
    editProjectAction: (state, {payload}: PayloadAction<IProject>) => {
      const projectEditingIndex = state.projects.findIndex((project) => project.id === payload.id)

      if (projectEditingIndex !== -1) {
        return {...state,
          projects: [...state.projects.slice(0, projectEditingIndex), payload,
            ...state.projects.slice(projectEditingIndex + 1)],
        }
      }

      return state
    },
    togglePinProject: (state, {payload}: PayloadAction<IProject['id']>) => {
      let index = -1;
      const project = state.projects.find((project, itemIndex) => {
        if (project.id === payload) {
          index = itemIndex
          return true
        }
      })

      if (index !== -1 && project) {
        const newProject = {...project, isPinned: !project?.isPinned}
        return {...state,
          projects: [...state.projects.slice(0, index), newProject, ...state.projects.slice(index+1)],
        }
      }

      return state
    },
  },
})

export const projectReducer = ProjectSlice.reducer

export const {getProjectsAction,
  addNewProject,
  deleteProject,
  editProjectAction,
  togglePinProject} = ProjectSlice.actions

export const projectsSelector = (state: RootReducer) => state.projectReducer.projects
