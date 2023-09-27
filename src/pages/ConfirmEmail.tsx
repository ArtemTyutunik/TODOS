import React, {useEffect} from 'react';
import {confirmEmail} from '@shared/api/services/user';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authVerified} from '@entities/user/model/store';
import {options} from '@shared/components/Notification/constants';

const ConfirmPage = () => {
  const url = window.location.href
  const token = new URLSearchParams(url.split('?')[1]).get('token')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSuccessVerification = (response: Response) => {
    if (response.status === 200) {
      toast.success(<div>Thanks for verifying your email</div>, options)
      navigate('/')
      dispatch(authVerified(true))
      localStorage.setItem('verified', 'true')
    }
  }

  useEffect(() => {
    const sendRequest = async () => {
      if (token) {
        return await confirmEmail(token)
      } else throw new Error('no token')
    }


    sendRequest().then(handleSuccessVerification)
  }, [])
  return (
    <div>

    </div>
  );
};

export default ConfirmPage;
