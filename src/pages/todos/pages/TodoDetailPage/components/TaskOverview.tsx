import React from 'react';
import {Box, Typography} from '@mui/material';
import {TodoLabelStyles} from '../../../../../entities/todos/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

interface Props {
    label: string,
    description?: string,
    onOpenForm(): void
}
const MyComponent = ({label, description, onOpenForm}: Props) => {
  return (
    <Box display={'flex'} width={'100%'} flexDirection={'column'} onClick={onOpenForm}>
      <Typography sx = {{...TodoLabelStyles, fontSize: '20px', marginBottom: '10px'}}>
        {label}
      </Typography>
      {
              description ? (
                  <Typography sx={{fontSize: '18px', color: 'inherit', fontWeight: 300}}>
                    {description}
                  </Typography>
              ) : (
                  <Box display={'flex'} alignItems={'center'} color={'#0000008F'}>
                    <DescriptionOutlinedIcon sx={{fontSize: '20px', color: 'inherit'}}/>
                    <Typography paddingLeft={'10px'} fontSize={'14px'} color={'inherit'}>
                          Description
                    </Typography>
                  </Box>
              )}
    </Box>
  );
};

export default MyComponent;
