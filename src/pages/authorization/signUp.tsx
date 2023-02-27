import {IFormInputs} from '@shared/forms/interfaces/interfaces';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {app} from '../../../firebaseConfig';

import {signUpUser} from './store';
import SignUpForm from '@entities/signUpForm/signUpForm';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onSubmit = (data: IFormInputs) => signUpHandler(data.login, data.password);

  function signUpHandler(login: string, password: string) {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, login, password)
        .then(({user})=> {
          dispatch(signUpUser(user));
          navigate('/today')
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((e) => console.log(e));
  }

  return <SignUpForm onSubmit={onSubmit}/>;
}

export default SignUp;
