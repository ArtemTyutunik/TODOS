import {Route, Routes,Navigate} from "react-router-dom";
import {TodayTodosPage,InboxTodosPage} from "./todos/pages";

const Routing = () => {
    return <Routes>
        <Route path={'/'} element={<Navigate to="/today" replace={true} />}/>
        <Route path={'today'} element={<TodayTodosPage/>}/>
        <Route path={'inbox'} element={<InboxTodosPage/>}/>
    </Routes>
}

export default Routing;