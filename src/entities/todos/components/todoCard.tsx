import React from 'react';
import {Box, Divider, IconButton, Tooltip, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

import MoreActionsMenu from './moreActionMenu';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import {TodoContainerStyles, todoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from '../styles';
import CheckboxComponent from './Checkbox';
import DueDateButton from '@entities/dueDateButton';
import TagLinks from '@entities/todos/components/TagsPanel';
import {userTagsSelector} from '@entities/tag/store/tagStore';

import '../css/inProcessTodo.css'
import {toggleIsCurrent} from '@entities/todos/store/todo';
import {sendUpdatedTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';
import {setTodoInfoId} from '@app/store/AppStore';
import parse from 'html-react-parser';

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
  const {label, description, date, id, tags, isCurrent} = todo;
  const userTags = useSelector(userTagsSelector)
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const todoFilteredTags = userTags.filter((userTag) => tags?.includes(userTag.id))

  const setAsCurrent = () => {
    try {
      const updatedTodo = {...todo, isCurrent: !isCurrent}
      sendUpdatedTodo(updatedTodo, userId)
      dispatch(toggleIsCurrent(updatedTodo))
    } catch (e) {
      console.log(e)
    }
  }

  const openDetailsPage = () => {
    const idToString = id.toString()
    dispatch(setTodoInfoId(idToString))
    localStorage.setItem('todoInfoId', idToString)
  }

  const descriptionHtml = parse(description)
  return (
    <>
      <Box sx={{mb: '25px', cursor: 'pointer', flexGrow: '1'}}
        onClick={openDetailsPage}
        data-testid="Todo card"
      >
        <Box sx = {TodoContainerStyles} className={`${isCurrent && 'todo-wrap' || ''}`}>
          <Box sx={{backgroundColor: 'white'}}
            display={'flex'}
            width={'100%'}
            padding={'10px'}
            borderRadius={'7px'}
            alignItems={'center'}
            justifyContent={'space-between'}
            zIndex={5}>
            <Box maxWidth={{mobile: '100%'}} sx={TodoFlexboxStyles}>
              <Box width={'100%'} onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
                <Box sx = {TodoFlexboxStyles} >
                  <CheckboxComponent onComplete={onComplete} todo={todo}/>
                  <Typography sx = {TodoLabelStyles} marginRight={'20px'}>
                    {label}
                  </Typography>
                </Box>
                <Box paddingLeft={'10px'}>
                  <Box sx={todoDescriptionStyles}>
                    {descriptionHtml}
                  </Box>
                  <Box>
                    {
                      tags && <TagLinks tags={todoFilteredTags}/>
                    }
                  </Box>

                  <Box display={'flex'} alignItems={'center'} >
                    <Box>
                      {
                        date && <Box>
                          <DueDateButton date={date} variant={'Standard'}/>
                        </Box>
                      }
                    </Box>
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
                onOpenTodoDetails={openDetailsPage}
                onDelete={onDeleteAction}
                onDuplicate = {onDuplicateAction}
                setAsCurrent={setAsCurrent}
                todo={todo}
                //@ts-ignore
                onSetPriority = {setPriorityAction}/>
            </Box>
          </Box>
        </Box>
        {
          !isCurrent && <Divider/>
        }
      </Box>
    </>


  );
};

export default TodoCard;
