import React from 'react';
import {Box, Checkbox, Grid, Typography} from '@mui/material';
import {ITodo} from '../../../../shared/interfaces';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {TodoLabelStyles} from '../../../../entities/todos/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';


const DetailsCard = ({todo}: { todo: ITodo }) => {
  const {label, done, description} = todo
  return (
    <Box bgcolor={'fff'}>
      <Grid container>
        <Grid item md={8}>
          <Box mb={'30px'}>
            <Box display={'flex'} alignItems={'center'}>
              <Checkbox icon={<RadioButtonUncheckedIcon/>}
                checkedIcon={<CheckCircleOutlineIcon/>}
                checked={done}/>
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
