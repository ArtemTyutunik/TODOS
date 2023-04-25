import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {signUpUser} from './store';
import SignUpForm from '@entities/signUpForm/signUpForm';
import useLocalStorage from '@shared/hooks/useLocalStorage';
import {signUpWithLoginAndPassword} from '@shared/api/services/authorizationService';

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
        .catch((e) => console.log(e));
  }

  return <SignUpForm onSubmit={onSubmit}/>;
}

export default SignUp;
