import {Box, Typography} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

const boxStyles = {
    display: 'flex',
    alignItems:'center',
    marginTop:'20px' ,
    color: '#515761',
    cursor: 'pointer',

    '&:hover': {
        color: '#1976d2'
    }
}

interface Props {
    onClick: () => void
}

const NoInboxTodos = ({onClick}: Props) => {
    return (
        <Box height={'100%'} alignItems={"center"}  display={"flex"}>
            <Box display={"flex"} flexDirection={"column"}  margin={'0 auto'} alignItems={"center"}>
                <Typography fontWeight={500} color={'#515761'} fontSize={'20px'}>
                    You have not added any todos yet!
                </Typography>
                <Box sx = {boxStyles} onClick={onClick}>
                    <AddTaskIcon sx ={{color: '#1976d2'}}/>
                    <Typography ml={'10px'} color={"inherit"} fontSize={'15px'} fontWeight={300}>
                        Add task
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default NoInboxTodos;