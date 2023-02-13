import React from 'react';
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

const imgUrl = 'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/418012032c5aaee447289642c812e569.jpg'

const NoTodayTodos = ({onClick}: Props) => {
    return (
            <Box height={'100%'} alignItems={"center"}  display={"flex"}>
                <Box display={"flex"} flexDirection={"column"}  margin={'0 auto'} alignItems={"center"}>
                    <img src={imgUrl} alt={'image'}/>
                    <Typography fontWeight={500} color={'#515761'} fontSize={'20px'}>
                        You`re all done for today! Enjoy the rest of your day
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
};

export default NoTodayTodos;
