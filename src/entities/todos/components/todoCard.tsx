import React, {useState} from 'react';
import {Box, Divider, IconButton, Tooltip, Typography, useTheme} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

import MoreActionsMenu from './moreActionMenu';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import {TodoContainerStyles, todoDescriptionStyles, TodoFlexboxStyles, TodoLabelStyles} from '../styles';
import CheckboxComponent from './Checkbox';
import DueDateButton from '@entities/dueDateButton';
import TagLinks from '@entities/todos/components/TagsPanel';
import {userTagsSelector} from '@entities/tag/store/tagStore';
import TodoDetailPage from '@entities/todos/components/TodoDetail/TodoDetailPage';

import '../css/inProcessTodo.css'
import {toggleIsCurrent} from '@entities/todos/store/todo';
import {sendUpdatedTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';
import {styled} from '@mui/material/styles';

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
  const theme = useTheme();
  const userTags = useSelector(userTagsSelector)
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const [isDetailsVisable, setDetailsVisable] = useState(false)
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

  return (
    <>
      {isDetailsVisable && <TodoDetailPage id={id}
        onClose={() => setDetailsVisable(false)}
        isOpen={isDetailsVisable}
      />
      }

      <Box sx={{mb: '10px', cursor: 'pointer', flexGrow: '1'}}
        onClick={() => setDetailsVisable((prevState) => !prevState)}
        data-testid="Todo card"
      >
        <Box sx={TodoContainerStyles} className={`${isCurrent && 'todo-wrap' || ''}`}>
          <BoxWrapper>
            <Box maxWidth={{mobile: '100%'}} sx={TodoFlexboxStyles}>
              <Box width={'100%'} onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
                <Box sx={TodoFlexboxStyles}>
                  <CheckboxComponent onComplete={onComplete} todo={todo}/>
                  <Typography sx={TodoLabelStyles} fontFamily={'inherit'} marginRight={'20px'}>
                    {label}
                  </Typography>
                </Box>
                <Box paddingLeft={'10px'}>
                  <Typography noWrap sx={todoDescriptionStyles}>
                    {description}
                  </Typography>
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
                  <EditIcon sx={{color: theme.text.title}}/>
                </IconButton>
              </Tooltip>

              <MoreActionsMenu
                onOpenTodoDetails={() => setDetailsVisable(true)}
                onDelete={onDeleteAction}
                onDuplicate = {onDuplicateAction}
                setAsCurrent={setAsCurrent}
                todo={todo}
                //@ts-ignore
                onSetPriority = {setPriorityAction}/>
            </Box>
          </BoxWrapper>
        </Box>
        {
          !isCurrent && <CustomDriver/>
        }
      </Box>
    </>
  );
};

const BoxWrapper = styled(Box)({
  backgroundColor: 'transparent',
  display: 'flex',
  width: '100%',
  padding: '10px',
  borderRadius: '7px',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
})

const CustomDriver = styled(Divider)(({theme}) => ({
  background: theme.background.divider,
}))


export default TodoCard;
