import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {authWithError, signUpUser} from '@entities/user/model/store';
import SignUpForm from '@features/signUp/components/signUpForm';
import {signUpWithLoginAndPassword} from '@shared/api/services/authorization';
import useAuth from '@pages/authentication/hooks/useAuth';
import {IUser} from '@shared/interfacesAndTypes';
import setUserDataToLocalStorage from '@shared/helpers/setUserDataToLocalStorage';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSuccess = (user: IUser) => {
    setUserDataToLocalStorage(user)
    dispatch(signUpUser(user));
    navigate('/today')
  }

  const onReject = (error: string) => {
    dispatch(authWithError(error))
  }

  const [signUpHandler, isPending, showingSuccess] = useAuth(signUpWithLoginAndPassword, onSuccess, onReject)

  const onSubmit = (data: IFormInputs) => signUpHandler(data.login, data.password);


  return <SignUpForm onSubmit={onSubmit} isSuccess={showingSuccess} isPending={isPending}/>;
}

export default SignUp;
