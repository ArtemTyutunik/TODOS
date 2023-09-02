import React, {useState} from 'react';
import {Box} from '@mui/material';
import {CloseIcon} from '@shared/components/icons';
import CustomIconButton from '@shared/components/CustomIconButton';
import {resendEmail as resendEmailAPI} from '@shared/api/services/user';

const NotVerified = () => {
  const [showMessage, setShowMessage] = useState(true)
  const [isResend, setIsResend] = useState(false)
  const {login = ''} = JSON.parse(localStorage.getItem('user')!)

  const resendEmail = async () => {
    try {
      const response = await resendEmailAPI(login)
      if (response.ok && response.status === 200) {
        setIsResend(true)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return showMessage ? (
    <Box sx={boxStyles}>
      <div>You did not verify your e-mail. If you did not get the verification message
        <span onClick={resendEmail}>{isResend ? ' sent': ' click here'}</span></div>
      <CustomIconButton onClick={() => setShowMessage(false)}>
        <CloseIcon sx={{fontSize: '17px'}}/>
      </CustomIconButton>
    </Box>
  ) : null
};

const boxStyles = {
  'minHeight': '30px',
  'backgroundColor': '#c1ba2f',
  'alignItems': 'center',
  'display': 'flex',
  'justifyContent': 'space-between',
  'padding': '0 20px',
  'color': '#202020',
  'fontSize': '15px',
  'fontWeight': '500',

  '& span': {

    textDecoration: 'underline',
  },
}

export default NotVerified;
