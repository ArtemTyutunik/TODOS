import {Route, Routes} from "react-router-dom";
import TodoList from "./todo-list";

const Routing = () => {
    return <Routes>
        <Route path={'/'} element={<TodoList/>}/>
    </Routes>
}

export default Routing;