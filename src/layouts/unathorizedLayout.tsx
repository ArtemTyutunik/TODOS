import {Navigate, Route, Routes} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useEffect} from 'react';
import Login from '@pages/authentication/login';
import SignUp from '@pages/authentication/signUp';
import HomePage from '@pages/authentication/HomePage/components/HomePage';

function UnathorizedLayout() {
  useEffect(() => {
    const pageLoader = document.querySelector('.loader-container')
    pageLoader?.remove()
  }, [])

  return (
    <GoogleOAuthProvider clientId={'63361521589-0s4b1l6p50hqfk5tee4r20scpqkpc9i2.apps.googleusercontent.com'}>
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/sign-up'} element={<SignUp/>}/>
        <Route path={'*'} element={<Navigate to={'/'} replace={true}/>}/>
      </Routes>
    </GoogleOAuthProvider>


  );
}

export default UnathorizedLayout;
