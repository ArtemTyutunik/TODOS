import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {authWithError, signUpUser} from '@entities/user/model/store';
import SignUpForm from '@features/signUp/components/signUpForm';
import {useLocalStorage} from '@shared/hooks';
import {signUpWithLoginAndPassword} from '@shared/api/services/authorization';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [, setValueLocalStorage] = useLocalStorage('user', null)
  const onSubmit = (data: IFormInputs) => signUpHandler(data.login, data.password);

  function signUpHandler(login: string, password: string) {
    signUpWithLoginAndPassword(login, password)
        .then((response)=> {
          dispatch(signUpUser(response));
          navigate('/today')
          setValueLocalStorage(response);
        })
        .catch((error) => {
          dispatch(authWithError(error))
        });
  }

  return <SignUpForm onSubmit={onSubmit}/>;
}

export default SignUp;
