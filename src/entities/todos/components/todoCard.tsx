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
import EventIcon from '@mui/icons-material/Event';

import MoreActionsMenu from "./moreActionMenu";
import {ITodo} from "../../../shared/interfaces";
import {TodoContainerStyles, TodoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from "../styles";

const switchColorCheckBox = (priority: string) : string => {
    switch (priority){
        case '1': return '#cc2a25'
        case '2': return '#ff824d'
        case '3' : return '#1531d1'
        case '4': return '#babbc2'
        default: return '#babbc2'
    }
}

interface TodoCardProps {
    todo: ITodo,
    onComplete: () => void,
    onEdit: () => void,
    onDeleteAction: () => void,
    onDuplicateAction: () => void,
    setPriorityAction: (priority: string) => void
}

const TodoCard = ({
  todo,
  onComplete,
  onEdit,
  onDeleteAction,
  onDuplicateAction,
  setPriorityAction}: TodoCardProps
) => {
    const {label, description, done,date, priority = '4'} = todo;
    const checkBoxColorStyle = {
        color: switchColorCheckBox(priority)
    }

    return (
        <Box mb={'25px'}>
            <Box sx = {TodoContainerStyles}>
                <Box
                    maxWidth={'50%'}
                    sx={TodoFlexboxStyles}>
                    <Box width={'100%'}>
                        <Box sx = {TodoFlexboxStyles}>
                            <Checkbox icon={<RadioButtonUncheckedIcon/>}
                                      checkedIcon={<CheckCircleOutlineIcon sx = {checkBoxColorStyle}/>}
                                      onChange={onComplete}
                                      checked={done}
                                      sx = {checkBoxColorStyle}/>
                            <Typography sx = {TodoLabelStyles}>
                                {label}
                            </Typography>
                        </Box>
                        <Typography noWrap sx={TodoDescriptionStyles}>
                            {description}
                        </Typography>
                        {
                            date && <Box sx = {TodoFlexboxStyles} paddingLeft={'42px'} mt={'5px'}>
                                        <EventIcon sx={{color: "#808080", fontSize: '13px'}}/>
                                        <Typography sx={{...TodoDescriptionStyles, marginLeft: '10px', paddingLeft: 0, fontSize: '13px',}}>
                                            {date}
                                        </Typography>
                                    </Box>
                        }
                    </Box>
                </Box>

                <Box>
                    <Tooltip title={"Edit"}>
                        <IconButton onClick={onEdit}>
                            <EditIcon  color={"action"}/>
                        </IconButton>
                    </Tooltip>

                    <MoreActionsMenu
                            onDelete={onDeleteAction}
                            onDuplicate = {onDuplicateAction}
                            onSetPriority = {setPriorityAction}/>
                </Box>

            </Box>

            <Divider/>
        </Box>
    );
};

export default TodoCard;
