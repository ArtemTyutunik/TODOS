import React, {memo} from 'react';
import CustomIconButton from '@shared/components/CustomIconButton';
import {Close} from '@mui/icons-material';
import {Box, Typography} from '@mui/material';
import {useProjectById} from '@entities/projects';
import {CircleIcon, InboxIcon} from '@shared/components/icons';
import {styled} from '@mui/material/styles';

interface Props {
    onClose: () => void,
    todoId: number,
    projectId: string | undefined
}

const InfoBoardActionPanel = ({onClose, projectId, todoId}: Props) => {
  return (
    <div>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
          <CustomIconButton onClick={onClose}>
            <ProjectName projectId={projectId}/>
          </CustomIconButton>
          <DividerBox></DividerBox>
          <Box>
            <Typography fontSize={'14px'}
              marginLeft={'8px'}
              sx={{color: 'rgba(0, 0, 0, 0.54)'}}
            >
              {todoId}
            </Typography>
          </Box>
        </Box>
        <CustomIconButton onClick={onClose}>
          <Close sx={{fontSize: '17px'}}/>
        </CustomIconButton>
      </Box>
    </div>
  );
};

const ProjectName = memo(({projectId}: {projectId: string | undefined}) => {
  const project = useProjectById(projectId)
  const inboxId = localStorage.getItem('inboxID')!

  return <Box display={'flex'} alignItems={'center'} padding={'0 5px'}>
    {
        projectId === inboxId ? ( <>
          <InboxIcon sx={(theme) => ({color: theme.background.inboxIcon, fontSize: '17px'})}/>
          <Typography ml={'5px'} fontSize={'14px'}>
              Inbox
          </Typography>
        </> ) : ( <>
          <CircleIcon sx={{fontSize: '12px', color: project?.color.background}}/>
          <Typography ml={'5px'} fontSize={'14px'}>
            {project?.name}
          </Typography>
        </>)

    }

  </Box>
})

const DividerBox = styled(Box)(() => ({
  'display': 'flex',
  'position': 'relative',
  'width': '10px',
  'height': '10px',
  '&::after': {
    content: '"/"',
    display: 'block',
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.54)',
    top: '-100%',
    right: '0',
    paddingLeft: '10px',
    fontSize: '20px',
  },
}))


export default InfoBoardActionPanel;
