import React, {FC, useState} from 'react';
import {Box, Divider, IconButton, Tooltip, Typography} from "@mui/material";

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentIcon from '@mui/icons-material/Comment';
import {useDispatch} from "react-redux";

import './hover.css'
import {toggleTaskComplete} from "../model/todo";
import EditTodoForm from "../../../pages/todos/ui/EditTodoForm";
import {ITodo} from "../../../shared/interfaces";

const todoActions = [
    {icon: <EditIcon  color={"action"}/>, label: "edit"},
    {icon:  <CommentIcon color={"action"}/>, label: "comment"},
    {icon:  <MoreHorizIcon color={"action"}/> , label: "more"}
]



interface TodoProps {
    todo: ITodo
}


const  Todo:FC<TodoProps> = ({todo})  => {
    const {label, description, done,id} = todo;
    const dispatch  = useDispatch()
    const [isEditing, setIsEditing] = useState(false)

    const onComplete = () => {
        dispatch(toggleTaskComplete(id))
    }

    const onEdit = () => {
        setIsEditing(true)
    }

    const onCloseEditForm = () => {
        setIsEditing(false)
    }

    if (isEditing) return <EditTodoForm onClose={() => onCloseEditForm} todo={todo}/>

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
                        <Box width={'100%'}>
                            <Box display = {"flex"} alignItems={"center"}>
                                <Checkbox icon={<RadioButtonUncheckedIcon/>}
                                          checkedIcon={<CheckCircleOutlineIcon/>}
                                          onChange={() => onComplete()}
                                          checked={done}/>
                                <Typography fontSize={'20px'} fontWeight={400} lineHeight={1.3}>
                                    {label}
                                </Typography>
                            </Box>
                            <Typography fontSize={'16px'}
                                fontWeight={300}
                                lineHeight={1} color={"#3a3939"}
                                noWrap
                                paddingLeft={'42px'}
                            >
                                {description}
                            </Typography>
                        </Box>
                    </Box>

                    <Box className={'button-in-todo'}>
                        {todoActions.map(todoAction => {
                            return (
                                <Tooltip title={todoAction.label} key={todoAction.label}>
                                    <IconButton onClick={onEdit}>
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