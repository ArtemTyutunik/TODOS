import Login from '@pages/authorization/login';
import {Navigate, Route, Routes} from 'react-router-dom';
import SignUp from '@pages/authorization/signUp';
import {useEffect} from 'react';

function UnathorizedLayout() {
  useEffect(() => {
    const pageLoader = document.querySelector('.loader-container')
    pageLoader?.remove()
  }, [])

  return (
    <Routes>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/sign-up'} element={<SignUp/>}/>
      <Route path={'*'} element={<Navigate to={'/login'} replace={true}/>}/>
    </Routes>

  );
}

export default UnathorizedLayout;
