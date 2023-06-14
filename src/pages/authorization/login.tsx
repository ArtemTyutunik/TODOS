import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authUser, authWithError} from '@entities/user/model/store';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import LoginForm from '@features/logIn/components/loginForm';
import {useLocalStorage} from '@shared/hooks';
import {loginWithLoginAndPassword} from '@shared/api/services/authorization';

function Login() {
  const onSubmit= (data: IFormInputs) => loginHandler(data.login, data.password);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [, setValueLocalStorage] = useLocalStorage('user', null)

  const loginHandler = (login: string, password: string) => {
    loginWithLoginAndPassword(login, password)
        .then((response) => {
          dispatch(authUser(response));
          setValueLocalStorage(response)
          navigate('/today')
        })
        .catch((error) => {
          dispatch(authWithError(error));
        });
  };
  return (
    <LoginForm onSubmit={onSubmit}/>
  );
}

export default Login;
