import React from 'react';
import {Box, Divider, IconButton, Tooltip, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';

import MoreActionsMenu from './moreActionMenu';
import {ITodo} from '../../../shared/interfaces';
import {TodoContainerStyles, TodoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from '../styles';
import {overdueDate} from '../../../shared/constants';
import {useNavigate} from 'react-router-dom';
import CheckboxComponent from './Checkbox';

interface TodoCardProps {
    todo: ITodo,
    onComplete: (e: React.SyntheticEvent) => void,
    onEdit: (e: React.SyntheticEvent) => void,
    onDeleteAction: (e: React.SyntheticEvent) => void,
    onDuplicateAction: (e: React.SyntheticEvent) => void,
    setPriorityAction: (e: React.SyntheticEvent, priority: string) => void
}

const TodoCard = ({
  todo,
  onComplete,
  onEdit,
  onDeleteAction,
  onDuplicateAction,
  setPriorityAction}: TodoCardProps,
) => {
  const {label, description, date, id} = todo;
  const navigate = useNavigate()

  const isOverdue = overdueDate(date!);
  return (
    <Box mb={'25px'} onClick={() => navigate(`task/${id}`)}>
      <Box sx = {TodoContainerStyles}>
        <Box
          maxWidth={'50%'}
          sx={TodoFlexboxStyles}>
          <Box width={'100%'}>
            <Box sx = {TodoFlexboxStyles}>
              <CheckboxComponent onComplete={onComplete} todo={todo}/>
              <Typography sx = {TodoLabelStyles}>
                {label}
              </Typography>
            </Box>
            <Typography noWrap sx={TodoDescriptionStyles}>
              {description}
            </Typography>
            {
              date && <Box sx = {TodoFlexboxStyles} paddingLeft={'42px'} mt={'5px'} color={isOverdue ? '#c40202' : '#808080'}>
                <EventIcon sx={{color: 'inherit', fontSize: '13px'}}/>
                <Typography sx={{...TodoDescriptionStyles, marginLeft: '10px', paddingLeft: 0, fontSize: '13px', color: 'inherit'}}>
                  {date}
                </Typography>
              </Box>
            }
          </Box>
        </Box>

        <Box>
          <Tooltip title={'Edit'}>
            <IconButton onClick={onEdit}>
              <EditIcon color={'action'}/>
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
