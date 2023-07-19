import React from 'react';
import {useDispatch} from 'react-redux';
import {authWithError, signUpUser} from '@entities/user/model/store';
import {useNavigate} from 'react-router-dom';
import useGoogleAccount from '@pages/authentication/hooks/useGoogleAccount';
import {IUser} from '@shared/interfacesAndTypes';
import {signUpWithGoogleService} from '@shared/api/services/authorization';
import ContinueWithGoogleButton from '@pages/authentication/components/ContinueWithGoogleButton';
import setUserDataToLocalStorage from '@shared/helpers/setUserDataToLocalStorage';

const SignUpWithGoogle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSuccess = (user: IUser) => {
    setUserDataToLocalStorage(user)
    dispatch(signUpUser(user))
    navigate('/today')
  }

  const signUpUserAccount = async (accountInfo: unknown) => {
    try {
      //@ts-ignore
      const {email = '', picture = '', name = ''} = accountInfo

      const user = await signUpWithGoogleService(email, {picture, name})

      if (user) {
        onSuccess(user)
      }
    } catch (e) {
      dispatch(authWithError(e as string))
    }
  }

  const authGoogleAccount = useGoogleAccount(signUpUserAccount)

  return <ContinueWithGoogleButton clickHandler={authGoogleAccount}/>
};

export default SignUpWithGoogle;
