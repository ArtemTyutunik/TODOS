import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authUser, authWithError} from '@entities/user/model/store';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import LoginForm from '@features/logIn/components/loginForm';
import {useLocalStorage} from '@shared/hooks';
import {loginWithLoginAndPassword} from '@shared/api/services/authorization';
import {IUser} from '@shared/interfacesAndTypes';

function Login() {
  const onSubmit = (data: IFormInputs) => loginHandler(data.login, data.password);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [, setValueLocalStorage] = useLocalStorage('user', null)
  const [isPending, setIsPending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  const onSuccess = (user: IUser) => {
    dispatch(authUser(user));
    setValueLocalStorage(user)
    navigate('/today')
  }

  const keepLoading = isPending || !minTimePassed

  useEffect(() => {
    if (!keepLoading && user) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onSuccess(user!)
      }, 950)
    }
  }, [keepLoading])

  const loginHandler = async (login: string, password: string) => {
    setIsPending(true)
    setMinTimePassed(false)

    setTimeout(() => {
      setMinTimePassed(true)
    }, 1000)

    try {
      const user = await loginWithLoginAndPassword(login, password)
      setIsPending(false)
      setUser(user)

      //@ts-ignore
    } catch (error: string) {
      setMinTimePassed(true)
      setIsPending(false)
      dispatch(authWithError(error))
    }
  };

  return (
    <LoginForm onSubmit={onSubmit} isPending={keepLoading} isSuccess={showSuccess}/>
  );
}

export default Login;
