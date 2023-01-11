import {Route, Routes} from "react-router-dom";
import TodosPage from "./todos";

const Routing = () => {
    return <Routes>
        <Route path={'/'} element={<TodosPage/>}/>
    </Routes>
}

export default Routing;