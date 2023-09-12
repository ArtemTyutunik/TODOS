import React, {memo, useEffect, useState} from 'react';
import {Box, Skeleton, Typography} from '@mui/material';
import MemberList from '@entities/projects/components/projectListItems/ShareProject/MemberList';
import {getProjectMembers} from '@shared/api/services/projects';

interface Props {
    id: string
}

const InvitedUsers = memo(({id}: Props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  //todo add caching
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        const data = await getProjectMembers(id)
        setTimeout(() => {
          setData(data)
          setLoading(false)
        }, 300)
      } catch (e) {
        setLoading(false)
        console.log(e)
      }
    }

    fn()
  }, [])

  return (
    <Box mt={'20px'}>
      <Typography fontSize={'15px'} mb={'15px'}>
                Users invited
      </Typography>
      {
                loading ? <>
                  <Loader/>
                  <Loader/>
                  <Loader/>
                </> : <MemberList members={data}/>
      }
    </Box>
  );
});

const Loader = () => {
  return <Box display={'flex'} mb={'10px'} alignItems={'center'}>
    <Skeleton variant={'circular'} width={'25px'} height={'25px'}/>
    <Box display={'flex'} flexDirection={'column'} width={'70%'} ml={'15px'}>
      <Skeleton variant={'text'} width={'30%'} height={'15px'}/>
      <Skeleton variant={'text'} width={'50%'} height={'15px'}/>
    </Box>
  </Box>
}

export default InvitedUsers;
