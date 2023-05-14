import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Divider, IconButton, Tooltip, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import MoreActionsMenu from './moreActionMenu';
import {ITodo} from '@shared/interfaces';
import {TodoContainerStyles, todoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from '../styles';
import CheckboxComponent from './Checkbox';
import DueDateButton from '@shared/components/DueDateComponents';
import TagLinks from '@entities/todos/components/TagsPanel';

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
  const {label, description, date, id, tags} = todo;

  const navigate = useNavigate()

  return (
    <Box mb={'25px'} onClick={() => navigate(`task/${id}`)}>
      <Box sx = {TodoContainerStyles}>
        <Box maxWidth={{mobile: '100%'}}
          sx={TodoFlexboxStyles}>
          <Box width={'100%'}>
            <Box sx = {TodoFlexboxStyles}>
              <CheckboxComponent onComplete={onComplete} todo={todo}/>
              <Typography sx = {TodoLabelStyles} marginRight={'20px'}>
                {label}
              </Typography>
              {
                tags && <TagLinks tags={tags}/>
              }
            </Box>
            <Typography noWrap sx={todoDescriptionStyles}>
              {description}
            </Typography>
            <Box display={'flex'} alignItems={'center'} >
              <Box marginRight={'20px'}>
                {
                  date && <Box ml={'46px'}>
                    <DueDateButton date={date} variant={'Standard'}/>
                  </Box>
                }
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={'ActionsMenu'}>
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
