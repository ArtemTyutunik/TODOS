import React from 'react';
import {Box, Typography, useTheme} from '@mui/material';
import AddTaskButton from '@features/CreateOrEditTodo/components/AddTaskButton';

interface Props {
    onClick: () => void
}

const imgUrl = 'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/418012032c5aaee447289642c812e569.jpg';

const NoTodayTodos = ({onClick}: Props) => {
  const theme = useTheme();
  return (
    <Box height={'100%'} alignItems={'center'} display={'flex'}>
      <Box display={'flex'}
        flexDirection={'column'}
        margin={'0 auto'}
        alignItems={'center'}
        textAlign={'center'}
      >
        <img src={imgUrl} alt={'image'}/>
        <Typography fontWeight={500} color={theme.description} fontSize={{mobile: '16px', largeMobile: '20px'}}>
                            You`re all done for today! Enjoy the rest of your day
        </Typography>
        <AddTaskButton onCreate={onClick}/>
      </Box>
    </Box>
  );
};

export default NoTodayTodos;
