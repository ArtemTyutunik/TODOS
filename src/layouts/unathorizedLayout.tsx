import Login from "../pages/authorization/login";
import {Route, Routes} from "react-router-dom";
import SignUp from "../pages/authorization/signUp";

function UnathorizedLayout() {
    return (
        <Routes>
            <Route path={'/'} element={<Login/>}/>
            <Route path={'/sign-up'} element={<SignUp/>}/>
        </Routes>

    );
}

export default UnathorizedLayout;
