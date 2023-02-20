import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {ITodo} from '../../../../shared/interfaces';
import {TodoLabelStyles} from '../../../../entities/todos/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckboxComponent from '../../../../entities/todos/components/Checkbox';


const DetailsCard = ({todo, onComplete}: { todo: ITodo, onComplete: (e: React.SyntheticEvent) => void }) => {
  const {label, description} = todo
  return (
    <Box bgcolor={'fff'}>
      <Grid container>
        <Grid item md={8}>
          <Box mb={'30px'}>
            <Box display={'flex'} alignItems={'center'}>
              <CheckboxComponent onComplete={onComplete} todo={todo}/>
              <Typography sx = {TodoLabelStyles}>
                {label}
              </Typography>
            </Box>
            {
              description || (
                <Box display={'flex'} paddingLeft={'40px'} alignItems={'center'} color={'#0000008F'}>
                  <DescriptionOutlinedIcon sx={{fontSize: '16px', color: 'inherit'}}/>
                  <Typography paddingLeft={'10px'} fontSize={'14px'} color={'inherit'}>
                        Description
                  </Typography>
                </Box>
              )}
          </Box>
        </Grid>
        <Grid item md={4}>

        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsCard;
