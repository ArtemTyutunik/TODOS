import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import {Alert} from '@mui/material';

const ErrorMessage = () => {
  const {isError, errorMessage} = useSelector((state: RootReducer) => state.userReducer);

  return isError ? <Alert severity="error">{errorMessage}</Alert> : null;
};

export default ErrorMessage;
