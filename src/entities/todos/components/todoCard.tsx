import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Divider, IconButton, Tooltip, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LabelIcon from '@mui/icons-material/Label';

import MoreActionsMenu from './moreActionMenu';
import {ITodo} from '@shared/interfaces';
import {TodoContainerStyles, TodoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from '../styles';
import CheckboxComponent from './Checkbox';
import DueDateButton from '@shared/components/DueDateComponents';

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
  const {label, description, date, id, Label} = todo;
  const navigate = useNavigate()

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
            <Box display={'flex'} alignItems={'center'}>
              <Box>
                {
                  date && <Box ml={'46px'}>
                    <DueDateButton date={date} variant={'Standard'}/>
                  </Box>
                }
              </Box>
              <Box marginLeft={'20px'} color={'#808080'}>
                {
                  Label && <Box display={'flex'} alignItems={'center'}>
                    <LabelIcon sx={{color: 'inherit', fontSize: '18px'}}/>
                    <Typography sx={{...TodoDescriptionStyles, paddingLeft: '5px'}}>
                      {Label}
                    </Typography>
                  </Box>
                }
              </Box>
            </Box>


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
