import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Divider, IconButton, Tooltip, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import MoreActionsMenu from './moreActionMenu';
import {ITodo} from '@shared/interfacesAndTypes';
import {TodoContainerStyles, todoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from '../styles';
import CheckboxComponent from './Checkbox';
import DueDateButton from '@shared/components/DueDateComponents';
import TagLinks from '@entities/todos/components/TagsPanel';

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
  setPriorityAction}: TodoCardProps,
) => {
  const {label, description, date, id, tags} = todo;
  const navigate = useNavigate()
  return (
    <Box sx={{mb: '25px', cursor: 'pointer'}}
      onClick={() => navigate(`task/${id}`)}
    >
      <Box sx = {TodoContainerStyles}>
        <Box maxWidth={{mobile: '100%'}}
          sx={TodoFlexboxStyles}>
          <Box width={'100%'} onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
            <Box sx = {TodoFlexboxStyles} >
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

        <Box className={'ActionsMenu'} onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
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
