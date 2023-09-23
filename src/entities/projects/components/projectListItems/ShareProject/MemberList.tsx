import React from 'react';
import {Box} from '@mui/material';
import {IMemberUser} from '@shared/interfacesAndTypes';
import UserItem from './UserItem';

const MemberList = ({members}: {members: IMemberUser[]}) => {
  return (
    <Box maxHeight={'250px'} overflow={'scroll'}>
      {
        members.map((member) => <UserItem member={member} key={member.login}/>)
      }
    </Box>
  );
};


export default MemberList;
