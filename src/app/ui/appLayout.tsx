import Header from '../../widgets/header';
import AuthorizedLayout from '@layouts/athorizedLayout';
import {useSelector} from 'react-redux';
import {RootReducer} from '../store';
import UnauthorizedLayout from '@layouts/unathorizedLayout';

const AppLayout = () => {
  const {isAuth} = useSelector((state: RootReducer) => state.userReducer);
  return isAuth ?
        <>
          <Header/>
          <AuthorizedLayout/>
        </> :
        <UnauthorizedLayout/>;
};

export default AppLayout;
