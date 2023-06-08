import {drawerReducer} from '@entities/drawer/store';
import {todosReducer} from '@entities/todos/store/todo';
import {userReducer} from '@entities/user/model/store';
import {tagReducer} from '@entities/tag/store/tagStore';
import {tagListReducer} from '@pages/todos/pages/FiltersAndTagsPage/components/tags/store';

export {
  drawerReducer,
  todosReducer,
  userReducer,
  tagReducer,
  tagListReducer,
};
