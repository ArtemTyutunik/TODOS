import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {IUser} from '@shared/interfacesAndTypes';
import {authUser, authWithError} from '@entities/user/model/store';
import {signInWithGoogleService} from '@shared/api/services/authorization';
import useGoogleAccount from '@pages/authentication/hooks/useGoogleAccount';
import ContinueWithGoogleButton from '@pages/authentication/components/ContinueWithGoogleButton';
import setUserDataToLocalStorage from '@shared/helpers/setUserDataToLocalStorage';
import {IGoogleAccountInfo} from '@shared/forms/interfaces/interfaces';

const SignInWithGoogle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSuccess = (user: IUser) => {
    setUserDataToLocalStorage(user)
    dispatch(authUser(user))
    navigate('/today')
  }

  const signUpUserAccount = async (accountInfo: IGoogleAccountInfo) => {
    try {
      const {email} = accountInfo

      const user = await signInWithGoogleService(email)

      if (user) {
        onSuccess(user)
      }
    } catch (e) {
      dispatch(authWithError('Something went wrong. Try again'))
    }
  }

  const authGoogleAccount = useGoogleAccount(signUpUserAccount)

  return <ContinueWithGoogleButton clickHandler={authGoogleAccount}/>
};


export default SignInWithGoogle;
