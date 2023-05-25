import {Route, Routes, Navigate} from 'react-router-dom';
import {lazy} from 'react';
import {Suspense} from 'react';
import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import SpinnerComponent from '@shared/components/SpinnerComponent/SpinnerComponent';

const TodayTodosPage = lazy(() => import('./todos/pages/TodayPage/TodayTodos'))
const InboxTodosPage = lazy(() => import('./todos/pages/InboxPage/InboxTodos'))
const TodoDetailPage = lazy(() => import('./todos/pages/TodoDetailPage/TodoDetailPage'))
const FilterAndLabelsPage = lazy(() => import('./todos/pages/FiltersAndLabelsPage/FiltersAndlabelsPage'))

const Routing = () => {
  const isFetched = useSelector((state: RootReducer) => state.todosReducer.isFetched)

  return !isFetched ? <SpinnerComponent/> :
      <>
        <Routes>
          <Route path={'/'} element={<Navigate to="/today" replace={true}/>}/>
          <Route path={'today'} element={
            <Suspense fallback={null}>
              <TodayTodosPage/>
            </Suspense>
          }/>
          <Route path={'inbox'} element={<Suspense fallback={null}>
            <InboxTodosPage/>
          </Suspense>}/>
          <Route path={'filters-and-labels'} element={<Suspense fallback={null}>
            <FilterAndLabelsPage/>
          </Suspense>}/>
          <Route path={'/:day?/task/:id'} element={<Suspense fallback={null}>
            <TodoDetailPage/>
          </Suspense>}/>
        </Routes>
      </>
}

export default Routing;
