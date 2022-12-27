import React from 'react';
import {Box, Divider, IconButton, Tooltip, Typography} from "@mui/material";

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentIcon from '@mui/icons-material/Comment';

import './hover.css'

const todoActions = [
    {icon: <EditIcon  color={"action"}/>, label: "edit"},
    {icon:  <CommentIcon color={"action"}/>, label: "comment"},
    {icon:  <MoreHorizIcon color={"action"}/> , label: "more"}
]

export interface ITodo {
    label: string,
    description?: string,
}


const  Todo = ({label, description}: ITodo)  => {
    return (
        <Box mb={'25px'} sx = {{cursor: 'pointer'}} className={'todo'}>
                <Box mb={'15px'}
                     display={"flex"}
                     alignItems={"center"}
                     justifyContent={"space-between"}
                >
                    <Box display={"flex"}
                         alignItems={"center"}
                         maxWidth={'50%'}>
                        <Checkbox icon={<RadioButtonUncheckedIcon/>} checkedIcon={<CheckCircleOutlineIcon/>}/>
                        <Box width={'100%'}>
                            <Typography fontSize={'20px'} fontWeight={400} lineHeight={1.3}>
                                {label}
                            </Typography>
                            <Typography fontSize={'16px'} fontWeight={300} lineHeight={1} color={"#3a3939"} noWrap>
                                {description}
                            </Typography>
                        </Box>
                    </Box>

                    <Box className={'button-in-todo'}>
                        {todoActions.map(todoAction => {
                            return (
                                <Tooltip title={todoAction.label} key={todoAction.label}>
                                    <IconButton>
                                        {todoAction.icon}
                                    </IconButton>
                                </Tooltip>
                            )
                        })}
                    </Box>

                </Box>

                <Divider/>
            </Box>
    );
}

export default Todo;