import React from 'react';
import {Box, SelectChangeEvent, useTheme} from '@mui/material';
import {IDate, ITodo, Priority} from '@shared/interfacesAndTypes';
import DetailActionPanelItem from '@pages/todos/pages/InfoBoard/components/DetailsActionsPanelItem';
import DueDateButton from '@entities/dueDateButton';
import {useTodoDate} from '@entities/todos/hooks';
import PriorityButton from '@entities/setPriorityButton/components/PriorityButton';
import useSelectPriority from '@shared/hooks/useSelectPriority';
import {useDispatch, useSelector} from 'react-redux';
import {setPriority} from '@entities/todos/store/todo';
import {sendUpdatedTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';
import TagsPanel from '@entities/todos/components/TagsPanel';
import {useTagById} from '@entities/tag';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent) => void
}

const DetailsCard = ({todo}: Props) => {
  const {date, id} = todo
  const theme = useTheme()
  const userId = useSelector(userIdSelector)
  const dispatch = useDispatch()
  const [todoDate, setTodoDate] = useTodoDate(date, id)
  const [priority, onSelected] = useSelectPriority(todo.priority)
  const tags = useTagById(todo.tags)

  const renderedTags = Array.isArray(tags) ? tags : [{...tags}]
  const onPriorityHandler = (event: SelectChangeEvent<Priority>) => {
    //@ts-ignore
    const priority: Priority = event.target.value
    const data = {id, priority}
    onSelected(event)
    sendUpdatedTodo(data, userId)
    dispatch(setPriority(data))
  }


  const onDateSelect = (newDate: IDate) => {
    setTodoDate(newDate)
    sendUpdatedTodo({id, date: newDate}, userId)
  }

  return (
    <Box bgcolor={theme.background.paper}
      borderRadius={'7px'}>
      <Box display={'flex'}>
        <Box width={'100%'} margin={'10px'} sx={{wordWrap: 'break-word'}} fontWeight={'bold'}>
          {todo.label}
        </Box>
      </Box>
    </Box>
  );
};

const panelStyles = {
  '& .MuiBox-root:last-child hr': {
    display: 'none',
  },
  'width': '100%',
  'height': '100%',
  'backgroundColor': '#fafafa',
  'borderRadius': '0 10px 10px 0',
  'padding': '20px 25px',
}

export default DetailsCard;


// <Box width={'40%'}>
//   <Box sx={panelStyles}>
//     <DetailActionPanelItem label={'Due date'}>
//       <DueDateButton date={todoDate} variant={'Standard'} onPassDateToBaseForm={onDateSelect}/>
//     </DetailActionPanelItem>
//     <DetailActionPanelItem label={'Set priority'}>
//       <PriorityButton initialPriority={priority} changeHandler={onPriorityHandler} variant={'short'}/>
//     </DetailActionPanelItem>
//     {
//         renderedTags.length! > 0 && <DetailActionPanelItem label={'Tags'}>
//           <TagsPanel tags={renderedTags}/>
//         </DetailActionPanelItem>
//     }
//   </Box>
// </Box>
