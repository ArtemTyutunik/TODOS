import React from 'react';
import {Box, Typography, useTheme} from '@mui/material';
import AddTaskButton from '@features/todoFeatures/CreateTodo/components/AddTaskButton';
import {useSelector} from 'react-redux';
import {themeModeSelector} from '@app/store/AppStore';

interface Props {
    onClick: () => void
}

const lightModeImgUrl = 'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/418012032c5aaee447289642c812e569.jpg';
const darkModeImgUrl = 'https://todoist.b-cdn.net/assets/images/65b5fe1fe17d640040f6c0888bddeb53.png'
const NoTodayTodos = ({onClick}: Props) => {
  const theme = useTheme();
  const isDarkMode = useSelector(themeModeSelector) === 'dark';
  return (
    <Box height={'100%'} alignItems={'center'} display={'flex'}>
      <Box display={'flex'}
        flexDirection={'column'}
        margin={'0 auto'}
        alignItems={'center'}
        textAlign={'center'}
      >
        <Box sx={styles(isDarkMode ? darkModeImgUrl : lightModeImgUrl)}/>
        <Typography fontWeight={500}
          fontSize={{mobile: '16px', largeMobile: '20px'}}
          color={theme.text.main}>
            You`re all done for today! Enjoy the rest of your day
        </Typography>
        <AddTaskButton onCreate={onClick}/>
      </Box>
    </Box>
  );
};

const styles = (url: string) => ({
  width: '100%',
  height: '300px',
  zIndex: 1,
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  marginBottom: '20px',
})

export default NoTodayTodos;
