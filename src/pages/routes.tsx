import {Route, Routes, Navigate} from 'react-router-dom';
import {lazy} from 'react';
import {Suspense} from 'react';
import {useSelector} from 'react-redux';
import {RootReducer} from '@shared/interfacesAndTypes';
import SpinnerComponent from '@shared/components/SpinnerComponent/SpinnerComponent';
import {TODAY_LINK, INBOX_LINK, TAGS_LINK} from '@shared/constants';
import {ProjectPage} from '@pages/project';

const TodayTodosPage = lazy(() => import('./todos/pages/TodayPage/TodayTodos'))
const InboxTodosPage = lazy(() => import('./todos/pages/InboxPage/InboxTodos'))
const FilterAndTagsPage = lazy(() => import('./todos/pages/TagsPage/TagsPage'))
const FilteredByTagTodosPage = lazy(() => import('./todos/pages/FilteredByTagTodosPage/FilteredByTagTodosPage'))

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
          <Route path={TAGS_LINK} element={<Suspense fallback={null}>
            <FilterAndTagsPage/>
          </Suspense>}/>
          <Route path={'/tags/:id'} element={<Suspense fallback={null}>
            <FilteredByTagTodosPage/>
          </Suspense>}>
          </Route>
          <Route path={'/project/:id'} element={<Suspense fallback={null}>
            <ProjectPage/>
          </Suspense>}>
          </Route>
        </Routes>
      </>
}

export default Routing;
