import AuthorizedLayout from '@layouts/athorizedLayout';
import UnauthorizedLayout from '@layouts/unathorizedLayout';
import {memo} from 'react';

const AppLayout = ({isAuth}: {isAuth: boolean}) => {
  return isAuth ?
        <>
          <AuthorizedLayout/>
        </> :
        <UnauthorizedLayout/>;
};

export default memo(AppLayout);
