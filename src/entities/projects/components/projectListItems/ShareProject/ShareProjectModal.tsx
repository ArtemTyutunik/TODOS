import {Box, Button, Typography} from '@mui/material';
import CustomIconButton from '@shared/components/CustomIconButton';
import {CloseIcon} from '@shared/components/icons';
import BasicModal from '@shared/components/modal';
import {styled} from '@mui/material/styles';
import {IProject} from '@shared/interfacesAndTypes';
import GeneralAccess from '@entities/projects/components/projectListItems/ShareProject/GeneralAccess';
import {editProjectThunk} from '@entities/projects/model/thunks';
import {useAppDispatch} from '@app/store';
import LinkIcon from '@mui/icons-material/Link';
import {HOST_URL} from '@shared/api/services/constants';
import InvitedUsers from '@entities/projects/components/projectListItems/ShareProject/InvitedUsers';
import UserInviteInput from '@entities/projects/components/projectListItems/ShareProject/UserInviteInput';
import {useEffect, useRef, useState} from 'react';

interface Props {
    open: boolean,
    onClose: () => void,
    project: IProject
}

const ShareProjectModal = ({open, onClose, project}: Props) => {
  const dispatch = useAppDispatch()
  const [isFocusedList, setIsFocusedList] = useState(false)
  const inputWrapperElement = useRef<HTMLDivElement>(null)
  const modalElement = useRef<HTMLDivElement>(null)

  const onCopyLink = async () => {
    const link = HOST_URL + 'project/' + project.id
    await navigator.clipboard.writeText(link)
  }

  const updateProjectData = (newValues: Partial<IProject>) => {
    dispatch(editProjectThunk({...project, ...newValues}))
  }

  useEffect(() => {
    const onClickOutsideList = (e: MouseEvent) => {
      const listElement = inputWrapperElement.current
      if (listElement?.contains(e.target as HTMLElement)) {
        setIsFocusedList(true)
      } else {
        setIsFocusedList(false)
      }
    }

    modalElement.current?.addEventListener('click', onClickOutsideList)

    return () => modalElement.current?.removeEventListener('click', onClickOutsideList)
  })

  return (
    <BasicModal open={open}
      ref={modalElement}
      onClose={onClose}>
      <Box minWidth={'400px'} padding={'20px'}>
        <TopPanel>
          <Typography>
             Share &quot;{project.name}&quot;
          </Typography>
          <CustomIconButton onClick={onClose}>
            <CloseIcon/>
          </CustomIconButton>
        </TopPanel>

        <Box display={'flex'} flexDirection={'column'} mt={'15px'}>

          <UserInviteInput listFocused={isFocusedList} ref={inputWrapperElement} projectId={project.id}/>
          <InvitedUsers id={project.id}/>

          <Box mt={'20px'}>
            <Typography fontSize={'15px'}>
              General access
            </Typography>
            <GeneralAccess shared={project.shared} updateProjectData={updateProjectData}/>
          </Box>

          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={'20px'}>
            <CopyLinkButton variant={'contained'} onClick={onCopyLink}>
              <LinkIcon sx={{marginRight: '10px', fontSize: '20px'}}/>
              Copy link
            </CopyLinkButton>
            <InviteButton variant={'contained'} onClick={onClose}>Done</InviteButton>
          </Box>
        </Box>
      </Box>
    </BasicModal>
  );
};


const InviteButton = styled(Button)(() => ({
  marginLeft: '10px',
  backgroundColor: '#1976d2',
  color: '#ffffff',
  padding: '4px 20px',
}))

const CopyLinkButton = styled(Button)(() => ({
  'marginLeft': '10px',
  'backgroundColor': '#fff',
  'color': '#1976d2',
  'fontSize': '14px',
  'padding': '4px 16px',
  'textTransform': 'none',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}))

const TopPanel = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: '5px',
}))


export default ShareProjectModal;
