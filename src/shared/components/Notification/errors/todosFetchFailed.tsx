import React from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logOutUser} from '@entities/user/model/store';

const TodosFetchFailed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const backToLogin = () => {
    dispatch(logOutUser())
    navigate('/login')
  }

  return (
    <Modal open={true} sx={{display: 'flex', alignItems: 'center', outline: 'none'}}>
      <Box maxWidth={'500px'}
        textAlign={'center'}
        height={'600px'}
        margin={'0 auto'}
        sx={{backgroundColor: '#fff', border: 'none'}}>
        <img src={'/todosFailed.jpg'} alt={'error image'}/>
        <Typography fontSize={'17px'} margin={'0 20px'} fontWeight={700} marginBottom={'10px'} color={'#1976d2'}>
            Oops... Something went wrong
        </Typography>
        <Typography fontSize={'14px'} margin={'0 20px'}>
              Please try again later or try to login again.
        </Typography>
        <Button onClick={backToLogin} sx={{mb: '10px'}}> Log in </Button>
      </Box>
    </Modal>
  );
};

export default TodosFetchFailed;
