import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authUser, authWithError} from '@entities/user/model/store';
import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import LoginForm from '@features/logIn/components/loginForm';
import {loginWithLoginAndPassword} from '@shared/api/services/authorization';
import {IUser} from '@shared/interfacesAndTypes';
import useAuth from '@pages/authentication/hooks/useAuth';
import setUserDataToLocalStorage from '@shared/helpers/setUserDataToLocalStorage';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onSuccess = (user: IUser) => {
    dispatch(authUser(user));
    setUserDataToLocalStorage(user)
    navigate('/today')
  }

  const onReject = (error: string) => {
    dispatch(authWithError(error))
  }

  const [loginHandler, isPending, showingSuccess] = useAuth(loginWithLoginAndPassword, onSuccess, onReject)

  const onSubmit = (data: IFormInputs) => loginHandler(data.login, data.password);

  return (
    <LoginForm onSubmit={onSubmit} isPending={isPending} isSuccess={showingSuccess}/>
  );
}

export default Login;
