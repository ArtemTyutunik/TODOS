import React, {useState} from 'react';
import {Box, Grid} from '@mui/material';
import {ITodo} from '@shared/interfaces';
import CheckboxComponent from '@entities/todos/components/Checkbox';
import {EditTodoForm} from '../../components/';
import TaskOverview from './components/TaskOverview';
import DetailActionPanelItem from '@pages/todos/pages/TodoDetailPage/components/DetailsActionsPanelItem';
import DueDateButton from '@shared/components/DueDateComponents';
import {useTodoDate} from '@entities/todos/hooks';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent) => void
}
const DetailsCard = ({todo, onComplete}: Props) => {
  const {label, description, date} = todo
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false)
  const [todoDate, setTodoDate] = useTodoDate(date, todo.id)
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
          <Box width={'100%'} height={'100%'} sx={{backgroundColor: '#fafafa'}} padding={'10px 25px'}>
            <DetailActionPanelItem label={'Due date'}>
              <DueDateButton date={todoDate} variant={'Standard'} onPassDateToBaseForm={setTodoDate}/>
            </DetailActionPanelItem>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsCard;
