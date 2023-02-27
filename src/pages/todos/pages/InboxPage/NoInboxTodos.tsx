import {Box, Typography} from '@mui/material';
import AddTaskButton from '../../components/DueDateComponents/AddTaskButton';

interface Props {
    onClick: () => void
}

const NoInboxTodos = ({onClick}: Props) => {
  return (
    <Box height={'100%'} alignItems={'center'} display={'flex'}>
      <Box display={'flex'} flexDirection={'column'} margin={'0 auto'} alignItems={'center'}>
        <Typography fontWeight={500} color={'#515761'} fontSize={'20px'}>
                    You have not added any todos yet!
        </Typography>
        <AddTaskButton onCreate={onClick}/>
      </Box>
    </Box>
  );
};

export default NoInboxTodos;
