import {Route, Routes, Navigate} from 'react-router-dom';
import {TodayTodosPage, InboxTodosPage, TodoDetailPage} from './todos/pages';

const Routing = () => {
  return <Routes>
    <Route path={'/'} element={<Navigate to="/today" replace={true} />}/>
    <Route path={'today'} element={<TodayTodosPage/>}/>
    <Route path={'inbox'} element={<InboxTodosPage/>}/>
    <Route path={'/:day?/task/:id'} element={<TodoDetailPage/>}/>
  </Routes>;
};

export default Routing;
