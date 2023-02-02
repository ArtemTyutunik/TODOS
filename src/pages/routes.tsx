import {Route, Routes,Navigate} from "react-router-dom";
import TodosPage from "./todos";

const Routing = () => {
    return <Routes>
        <Route path={'/'} element={<Navigate to="/today" replace={true} />}/>
        <Route path={'today'} element={<TodosPage/>}/>
    </Routes>
}

export default Routing;