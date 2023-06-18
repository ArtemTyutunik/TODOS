import React, {useState} from 'react';
import {Box, Divider, IconButton, Tooltip, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import MoreActionsMenu from './moreActionMenu';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import {TodoContainerStyles, todoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from '../styles';
import CheckboxComponent from './Checkbox';
import DueDateButton from '@entities/dueDateButton';
import TagLinks from '@entities/todos/components/TagsPanel';
import {useSelector} from 'react-redux';
import {userTagsSelector} from '@entities/tag/store/tagStore';
import TodoDetailPage from '@entities/todos/components/TodoDetail/TodoDetailPage';

interface TodoCardProps {
    todo: ITodo,
    onComplete: () => void,
    onEdit: () => void,
    onDeleteAction: () => void,
    onDuplicateAction: () => void,
    setPriorityAction: (priority: Priority) => void
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
  const userTags = useSelector(userTagsSelector)
  const [isDetailsVisable, setDetailsVisable] = useState(false)
  const todoFilteredTags = userTags.filter((userTag) => tags?.includes(userTag.id))

  return (
    <>
      {isDetailsVisable &&
          <TodoDetailPage id={id}
            onClose={() => setDetailsVisable(false)}
            isOpen={isDetailsVisable}/>}
      <Box sx={{mb: '25px', cursor: 'pointer'}}
        onClick={() => setDetailsVisable((prevState) => !prevState)}
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
              </Box>
              <Typography noWrap sx={todoDescriptionStyles}>
                {description}
              </Typography>
              <Box paddingLeft={'42px'}>
                {
                  tags && <TagLinks tags={todoFilteredTags}/>
                }
              </Box>

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
              onOpenTodoDetails={( ) => setDetailsVisable(true)}
              onDelete={onDeleteAction}
              onDuplicate = {onDuplicateAction}
              //@ts-ignore
              onSetPriority = {setPriorityAction}/>
          </Box>

        </Box>

        <Divider/>
      </Box>
    </>


  );
};

export default TodoCard;
