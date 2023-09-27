import React from 'react';
import {Box} from '@mui/material';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <Box sx={wrapperStyles}>
      <img src={'/not-found.jpg'} alt={'404 image'}/>
      <Link to={'/today'}>Go home</Link>
    </Box>
  );
};

const wrapperStyles = {
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  '& a': {
    color: 'white',
    fontSize: '16px',
    width: 'fit-content',
    background: '#1976d2',
    padding: '7px 30px',
    borderRadius: '15px',
  },
}
export default NotFound;
