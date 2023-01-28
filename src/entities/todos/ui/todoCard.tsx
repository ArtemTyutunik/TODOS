import React from 'react';
import { Box,
    Divider,
    IconButton,
    Tooltip,
    Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

import MoreActionsMenu from "./moreActionMenu";
import {ITodo} from "../../../shared/interfaces";


interface TodoCardProps {
    todo: ITodo,
    onComplete: () => void,
    onEdit: () => void,
    onDeleteAction: () => void,
    onDuplicateAction: () => void,
    setPriorityAction: (priority: string) => void
}

const switchColorCheckBox = (priority: string) : string => {
    switch (priority){
        case '1': return '#cc2a25'
        case '2': return '#ff824d'
        case '3' : return '#1531d1'
        case '4': return '#babbc2'
        default: return '#babbc2'
    }
}

const TodoCard = ({todo,
                  onComplete,
                  onEdit,
                  onDeleteAction,
                  onDuplicateAction,
                  setPriorityAction}: TodoCardProps) => {

    const {label, description, done, priority = '4'} = todo;
    const checkBoxColorStyle = {
        color: switchColorCheckBox(priority)
    }

    return (
        <Box mb={'25px'} sx = {{cursor: 'pointer'}}>
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
                                      checkedIcon={<CheckCircleOutlineIcon sx = {checkBoxColorStyle}/>}
                                      onChange={() => onComplete()}
                                      checked={done}
                                      sx = {checkBoxColorStyle}/>
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

                <Box>
                    <Tooltip title={"Edit"}>
                        <IconButton onClick={onEdit}>
                            <EditIcon  color={"action"}/>
                        </IconButton>
                    </Tooltip>

                    <MoreActionsMenu onDelete={onDeleteAction}
                                     onDuplicate = {onDuplicateAction}
                                     onSetPriority = {setPriorityAction}/>
                </Box>

            </Box>

            <Divider/>
        </Box>
    );
};

export default TodoCard;
