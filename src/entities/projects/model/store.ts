import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProject, RootReducer} from '@shared/interfacesAndTypes';

interface InitialState {
  projects: IProject[]
}

const initialState: InitialState = {
  projects: [{
    name: 'Test',
    id: '1234566778',
    color: {name: 'Charcoal', textColor: '000000', background: 'green'},
  },
  {
    name: 'Test',
    id: '12345886767578',
    color: {name: 'Charcoal', textColor: '000000', background: 'red'},
  },
  ],
}

const ProjectSlice = createSlice({
  name: 'Projects',
  initialState: initialState,
  reducers: {
    getProjectsAction: (state, action) => {
      return {...state, projects: [...state.projects, ...action.payload]}
    },
    addNewProject: (state, action: PayloadAction<IProject>) => {
      return {...state, projects: [...state.projects, action.payload]}
    },
  },
})

export const projectReducer = ProjectSlice.reducer

export const {getProjectsAction, addNewProject} = ProjectSlice.actions

export const projectsSelector = (state: RootReducer) => state.projectReducer.projects
