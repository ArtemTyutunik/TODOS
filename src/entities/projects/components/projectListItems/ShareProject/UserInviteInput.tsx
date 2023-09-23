import React, {forwardRef, useCallback} from 'react';
import {Avatar, Box, Button, TextField, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import useSearchUsers from '@entities/user/hooks/useSearchUsers';
import {debounce} from '@shared/helpers/debounce';
import {SearchedUser} from '@shared/api/services/user';
import SpinnerComponent from '@shared/components/SpinnerComponent/SpinnerComponent';
import {sendInviteToProject} from '@shared/api/services/projects';
import {useVisable} from '@shared/hooks';


interface Props {
    listFocused: boolean,
    projectId: string
}
const UserInviteInput = forwardRef((props: Props, ref) => {
  const {listFocused, projectId} = props
  const [query, setQuery] = React.useState('');
  const [users, loading, getUsers] = useSearchUsers()

  const [shownResults, showResults, hideResults] = useVisable(true)

  const debounced = useCallback(debounce(getUsers, 200), [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value as string
    setQuery(newQuery)
    debounced(newQuery, projectId)
  }

  const onUserInvite = async (email: string, regType: string) => {
    await sendInviteToProject(projectId, email, regType)
    hideResults()
  }

  const isResultVisible = (loading || ( listFocused && query.length > 0 )) && shownResults

  return (
    <Box display={'flex'} flexDirection={'column'} ref={ref}>
      <UserEmailInput id={'shared_user_email'}
        fullWidth
        value={query}
        onFocus={showResults}
        onChange={onChange}
        placeholder={'Enter user email'}
        autoFocus />

      {isResultVisible && <SearchedUsers users={users} loading={loading} onInvite={onUserInvite}/>}
    </Box>
  );
});

interface SearchedUserProps {
  users: SearchedUser[],
  loading: boolean,
  onInvite: (email: string, regType: string) => void
}

const SearchedUsers = (props: SearchedUserProps) => {
  const {users, loading, onInvite} = props

  return <SearchedList>
    <Box>
      {
      loading ? <Box width={'100%'} height={'100%'} mt={'15px'}>
        <SpinnerComponent size={'medium'}/>
      </Box> : <>
        {
          users.length > 0 ? users.map((member) => (
            <UserListWrapper key={member.login + member.regType}>
              <Box display={'flex'} alignItems={'center'}>
                <Avatar src={member.picture} sx={{width: '30px', height: '30px'}}/>
                <Box display={'flex'} flexDirection={'column'} width={'100%'} ml={'15px'}>
                  <Typography sx={textStyles} mb={'5px'} fontWeight={500}>
                    {member.name || 'No name'}
                  </Typography>
                  <Typography sx={textStyles}>
                    {member.login}
                  </Typography>
                </Box>
              </Box>
              <Button onClick={() => onInvite(member.login, member.regType)} sx={{textTransform: 'none'}}>
                Invite
              </Button>
            </UserListWrapper>
          )) : <>
            <Typography mt={'10px'} textAlign={'center'}>
              No users found
            </Typography>
          </>
        }
      </>
      }
    </Box>
  </SearchedList>
}

const SearchedList = styled(Box)(() => ({
  height: 'auto',
  display: 'flex',
  minHeight: '50px',
  backgroundColor: '#edf2fc',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  width: '90%',
  flexDirection: 'column',
  position: 'absolute',
  marginTop: '32px',
  zIndex: 5,
}))

const UserListWrapper = styled(Box)(() => ({
  'padding': '10px 15px',
  'display': 'flex',
  'mb': '10px',
  'alignItems': 'center',
  'justifyContent': 'space-between',
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


const UserEmailInput = styled(TextField)(() => ({
  '& input': {
    'padding': '4px 8px',
    '&::placeholder': {
      fontSize: '14px',
    },
  },
  '&:hover': {},
}))

export default UserInviteInput;
