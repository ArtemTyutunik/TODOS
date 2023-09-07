import {combineReducers, configureStore, PreloadedState} from '@reduxjs/toolkit';
import {drawerReducer} from '../../widgets/drawer/store';
import {todosReducer} from '@entities/todos/store/todo';
import {userReducer} from '@entities/user/model/store';
import {tagReducer} from '@entities/tag/store/tagStore';
import {tagListReducer} from '@pages/todos/pages/TagsPage/components/tags/store';
import {favoriteReducer} from '@features/addToFavorites';
import {projectReducer} from '@entities/projects/model/store';
import {appSetupReducer} from '@app/store/AppStore'


const reducers = {
  drawerReducer,
  todosReducer,
  userReducer,
  tagReducer,
  tagListReducer,
  favoriteReducer,
  projectReducer,
  appSetupReducer,
}

const rootReducer = combineReducers({...reducers})

export type RootMockState = ReturnType<typeof rootReducer>

export const setupMockStore = (preloadedState?: PreloadedState<RootMockState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type AppMockStore = ReturnType<typeof setupMockStore>
