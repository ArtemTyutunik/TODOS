import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import {app} from '../../../firebaseConfig';
import {authUser, authWithError} from './store';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import LoginForm from '@entities/loginForm/loginForm';
import useLocalStorage from '@shared/hooks/useLocalStorage';

function Login() {
  const onSubmit= (data: IFormInputs) => loginHandler(data.login, data.password);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [, setValueLocalStorage] = useLocalStorage('user', null)

  const loginHandler = (login: string, password: string) => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, login, password)
        .then((response) => {
          dispatch(authUser(response));
          setValueLocalStorage(response)
          navigate('/today')
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
