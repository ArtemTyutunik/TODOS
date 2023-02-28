import React, {useState} from 'react';
import {Box, Grid} from '@mui/material';
import {ITodo} from '../../../../shared/interfaces';
import CheckboxComponent from '../../../../entities/todos/components/Checkbox';
import {EditTodoForm} from '../../components';
import TaskOverview from './components/TaskOverview';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent) => void
}
const DetailsCard = ({todo, onComplete}: Props) => {
  const {label, description} = todo
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false)

  const onClose = () => {
    setIsEditDetailsOpen(false)
  }

  const onOpenEditForm = () => setIsEditDetailsOpen(true)

  return (
    <Box bgcolor={'#fff'} minWidth={'700px'}>
      <Grid container>
        <Grid item md={8}>
          <Box mb={'30px'} display={'flex'} marginRight={'10px'} marginTop={'10px'}>
            <Box display={'flex'}>
              <CheckboxComponent onComplete={onComplete} todo={todo}/>
            </Box>
            {
              isEditDetailsOpen ? (
                  <Box width={'100%'}>
                    <EditTodoForm
                      onClose={onClose}
                      todo={todo}
                      hideActions/>
                  </Box>
              ) : (
                  <TaskOverview
                    label={label}
                    description={description}
                    onOpenForm={onOpenEditForm}/>
              )
            }
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box width={'100%'} height={'100%'} sx={{backgroundColor: '#fafafa'}}>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsCard;
