import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, MenuItem, Select, SelectChangeEvent, Theme, Typography} from '@mui/material';
import CustomIconButton from '@shared/components/CustomIconButton';
import PublicIcon from '@mui/icons-material/Public';
import {IProject} from '@shared/interfacesAndTypes';

interface Props {
  shared: IProject['shared'];
  updateProjectData: (newValues: Partial<IProject>) => void
}

const GeneralAccess = ({shared, updateProjectData}: Props) => {
  const [currentAccessType, setCurrentAccessType] = useState(shared);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newAccess = event.target.value as IProject['shared'];
    setCurrentAccessType(newAccess);
    updateProjectData({shared: newAccess})
  };

  const CurrentItem = currentAccessType === 'private' ? restrictedAccess : linkAccess

  return (
    <Wrapper>
      <Box width={'30px'} height={'30px'} borderRadius={'50%'}
        sx={{backgroundColor: '#f5f5f5'}}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}>
        {CurrentItem.Image}
      </Box>
      <Box ml={'10px'}>
        <CustomIconButton sx={buttonStyle}>
          <AccessSelect value={currentAccessType} onChange={handleChange}>
            <MenuItem value={'private'} sx={menuItemStyle}>{restrictedAccess.value}</MenuItem>
            <MenuItem value={'public'} sx={menuItemStyle}>{linkAccess.value}</MenuItem>
          </AccessSelect>
        </CustomIconButton>
        <Typography fontSize={'13px'} ml={'5px'} fontWeight={'300'}>
          {CurrentItem.description}
        </Typography>
      </Box>
    </Wrapper>
  );
};

interface ProjectAccess {
  Image: React.ReactElement,
  value: string,
  description: string
}

const restrictedAccess: ProjectAccess = {
  Image: <img style={{maxWidth: '16px', maxHeight: '16px'}} src={'/restricted.svg'}/>,
  value: 'Restricted',
  description: 'Only people with access can open with the link',
}

const linkAccess: ProjectAccess = {
  Image: <PublicIcon sx={{maxWidth: '18px', maxHeight: '18px'}}/>,
  value: 'Anyone with the link',
  description: 'Anyone on the internet with the link can view',
}


const menuItemStyle = (theme: Theme) => ({
  fontSize: '13px',
  padding: '4px 8px',
  paddingLeft: '5px',
  fontWeight: 500,
  fontFamily: theme.typography.fontFamily,
  color: '#202020',
})
const Wrapper = styled(Box)({
  'width': '100%',
  'padding': '5px 10px',
  'display': 'flex',
  'alignItems': 'center',
  'margin': '5px 0px',
  'borderRadius': '5px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
})

const AccessSelect = styled(Select)({
  'width': '100%',
  'padding': '5px 0',
  'fontSize': '14px',
  '&:hover': {},
  'border': 'none',
  '& .MuiSelect-select': {
    padding: '0',
    fontSize: '14px',
  },
  '& fieldset': {
    border: 'none',
  },

})

const buttonStyle = (theme: Theme) => ({
  fontSize: '13px',
  padding: '0px',
  paddingLeft: '5px',
  fontWeight: 500,
  fontFamily: theme.typography.fontFamily,
  color: '#202020',
})

export default GeneralAccess;
