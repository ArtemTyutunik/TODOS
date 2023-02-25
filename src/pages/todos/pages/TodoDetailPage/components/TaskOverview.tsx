import React from 'react';
import {Box, Typography} from '@mui/material';
import {TodoLabelStyles} from '../../../../../entities/todos/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

interface Props {
    label: string,
    description?: string,
    onOpenForm(): void
}
const TaskOverview = ({label, description, onOpenForm}: Props) => {
  return (
    <Box display={'flex'} width={'100%'} flexDirection={'column'} onClick={onOpenForm}>
      <Typography sx = {{...TodoLabelStyles, fontSize: '20px', marginBottom: '10px', cursor: 'text'}}>
        {label}
      </Typography>
      {
              description ? (
                  <Typography sx={{fontSize: '18px', color: 'inherit', fontWeight: 300, cursor: 'text'}}>
                    {description}
                  </Typography>
              ) : (
                  <Box sx={{cursor: 'text'}} display={'flex'} alignItems={'center'} color={'#0000008F'} >
                    <DescriptionOutlinedIcon sx={{fontSize: '20px', color: 'inherit'}}/>
                    <Typography paddingLeft={'10px'} fontSize={'14px'} color={'inherit'}>
                          Description
                    </Typography>
                  </Box>
              )}
    </Box>
  );
};

export default TaskOverview;
