import React from 'react';
import {Box, Typography} from '@mui/material';
import AddTaskButton from '@features/todoFeatures/CreateTodo/components/AddTaskButton';
import CreateTodoForm from '@features/todoFeatures/CreateTodo/components/createTodoForm';
import {ITodo} from '@shared/interfacesAndTypes';
import {useVisable} from '@shared/hooks';

interface Props {
  initialTag?: ITodo['tags']
}
const NoTodosWithTag = ({initialTag}: Props) => {
  const [isOpenForm, openForm, closeForm] = useVisable(false);

  const form = (
    <Box mt={'20px'} width={'100%'}>
      <CreateTodoForm onClose={closeForm}
        initialTag={initialTag}/>
    </Box>
  );

  return isOpenForm ? form : <>
    <Box display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      alignItems={'center'}
      textAlign={'center'}>
      <img style={{alignSelf: 'center'}}
        src="https://todoist.b-cdn.net/assets/images/5912cb674b44ab3d789ea98c95d1cfe3.jpg" alt=""/>
      <Typography color={'#202020'} fontWeight={700}>
          No todos found, try adding this tag to some tasks…
      </Typography>
      <AddTaskButton onCreate={openForm}/>
    </Box>
  </>
};

export default NoTodosWithTag;
