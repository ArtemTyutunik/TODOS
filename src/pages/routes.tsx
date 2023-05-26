import {Route, Routes, Navigate} from 'react-router-dom';
import {lazy} from 'react';
import {Suspense} from 'react';
import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import SpinnerComponent from '@shared/components/SpinnerComponent/SpinnerComponent';
import {TODAY_LINK, INBOX_LINK, FILTERS_AND_TAGS_LINK} from '@shared/constants';

const TodayTodosPage = lazy(() => import('./todos/pages/TodayPage/TodayTodos'))
const InboxTodosPage = lazy(() => import('./todos/pages/InboxPage/InboxTodos'))
const TodoDetailPage = lazy(() => import('./todos/pages/TodoDetailPage/TodoDetailPage'))
const FilterAndTagsPage = lazy(() => import('./todos/pages/FiltersAndTagsPage/FiltersAndTagsPage'))

const Routing = () => {
  const isFetched = useSelector((state: RootReducer) => state.todosReducer.isFetched)

  return !isFetched ? <SpinnerComponent/> :
      <>
        <Routes>
          <Route path={'/'} element={<Navigate to="/today" replace={true}/>}/>
          <Route path={TODAY_LINK} element={
            <Suspense fallback={null}>
              <TodayTodosPage/>
            </Suspense>
          }/>
          <Route path={INBOX_LINK} element={<Suspense fallback={null}>
            <InboxTodosPage/>
          </Suspense>}/>
          <Route path={FILTERS_AND_TAGS_LINK} element={<Suspense fallback={null}>
            <FilterAndTagsPage/>
          </Suspense>}/>
          <Route path={'/:day?/task/:id'} element={<Suspense fallback={null}>
            <TodoDetailPage/>
          </Suspense>}/>
        </Routes>
      </>
}

export default Routing;
