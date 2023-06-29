import Login from '@pages/authorization/login';
import {Navigate, Route, Routes} from 'react-router-dom';
import SignUp from '@pages/authorization/signUp';
import {useEffect} from 'react';
import HomePage from '@pages/authorization/HomePage/components/HomePage';

function UnathorizedLayout() {
  useEffect(() => {
    const pageLoader = document.querySelector('.loader-container')
    pageLoader?.remove()
  }, [])

  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>}/>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/sign-up'} element={<SignUp/>}/>
      <Route path={'*'} element={<Navigate to={'/'} replace={true}/>}/>
    </Routes>

  );
}

export default UnathorizedLayout;
