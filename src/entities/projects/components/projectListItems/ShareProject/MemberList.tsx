import React from 'react';
import {Avatar, Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {IProject} from '@shared/interfacesAndTypes';


const MemberList = ({members}: {members: IProject['members']}) => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  return (
    <Box maxHeight={'250px'} overflow={'scroll'}>
      {
        members.map((member) => (
          <UserListWrapper display={'flex'} mb={'10px'} alignItems={'center'} key={member.login}>
            <Avatar src={member.picture} sx={{width: '30px', height: '30px'}}/>
            <Box display={'flex'} flexDirection={'column'} width={'100%'} ml={'15px'}>
              <Typography sx={textStyles} mb={'5px'} fontWeight={500}>
                {member.name || 'No name'} { user.login === member.login ? ' (you)' : null}
              </Typography>
              <Typography sx={textStyles}>
                {member.login}
              </Typography>
            </Box>
            {
                member.role === 'owner' ? <Box color={'#b7b6b6'} fontSize={'14px'}>
                  Owner
                </Box> : null
            }
          </UserListWrapper>
        ))
      }
    </Box>
  );
};

const UserListWrapper = styled(Box)(() => ({
  'padding': '10px 15px',
  'borderRadius': '5px',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}))

const textStyles = {
  width: '100%',
  height: '15px',
  fontSize: '14px',
}

export default MemberList;
