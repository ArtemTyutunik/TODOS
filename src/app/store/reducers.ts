import {drawerReducer} from '../../widgets/drawer/store';
import {todosReducer} from '@entities/todos/store/todo';
import {userReducer} from '@entities/user/model/store';
import {tagReducer} from '@entities/tag/store/tagStore';
import {tagListReducer} from '@pages/todos/pages/FiltersAndTagsPage/components/tags/store';
import {favoriteReducer} from '@features/addToFavorites';

export {
  drawerReducer,
  todosReducer,
  userReducer,
  tagReducer,
  tagListReducer,
  favoriteReducer,
};
