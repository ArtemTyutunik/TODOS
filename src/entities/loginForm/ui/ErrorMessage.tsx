import {useSelector} from 'react-redux';
import {RootReducer} from '../../../app/store';
import {Alert} from '@mui/material';


const configureLabel = (message: string | null) => {
  switch (message) {
    case 'auth/wrong-password': return 'Sorry, you entered the wrong password :( Please try again!';
    case 'auth/invalid-email': return 'Sorry, you entered the wrong email :( Please try again!';
    default: return 'Sorry, some unexpected error occurred :( Please try later!\'';
  }
};

const ErrorMessage = () => {
  const {isError, errorMessage} = useSelector((state: RootReducer) => state.userReducer);

  return isError ? <Alert severity="error">{configureLabel(errorMessage)}</Alert> : null;
};

export default ErrorMessage;
