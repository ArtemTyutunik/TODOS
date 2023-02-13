import React from 'react';
import {useDispatch} from 'react-redux';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import {app} from '../../../firebaseConfig';
import {authUser, authWithError} from './store';
import {IFormInputs} from '../../shared/forms/interfaces/interfaces';

import LoginForm from '../../entities/loginForm/loginForm';

function Login() {
  const onSubmit= (data: IFormInputs) => loginHandler(data.login, data.password);
  const dispatch = useDispatch();

  const loginHandler = (login: string, password: string) => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, login, password)
        .then((response) => {
          dispatch(authUser(response));
          localStorage.setItem('user', JSON.stringify(response));
        })
        .catch((e: {code: string}) => {
          dispatch(authWithError(e.code));
        });
  };
  return (
    <LoginForm onSubmit={onSubmit}/>
  );
}

export default Login;
