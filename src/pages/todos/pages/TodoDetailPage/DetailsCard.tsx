import React from 'react';
import {Box, SelectChangeEvent, useTheme} from '@mui/material';
import {IDate, ITodo, Priority} from '@shared/interfaces';
import DetailActionPanelItem from '@pages/todos/pages/TodoDetailPage/components/DetailsActionsPanelItem';
import DueDateButton from '@shared/components/DueDateComponents';
import {useTodoDate} from '@entities/todos/hooks';
import PriorityButton from '@shared/components/Priority/PriorityButton';
import useSelectPriority from '@shared/hooks/useSelectPriority';
import {useDispatch} from 'react-redux';
import {setPriority} from '@entities/todos/store/todo';
import {sendUpdatedTodo} from '@shared/api/services/fetchTodos';
import InfoCard from '@pages/todos/pages/TodoDetailPage/components/InfoCard';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent) => void
}

const DetailsCard = ({todo, onComplete}: Props) => {
  const {date, id} = todo
  const theme = useTheme()
  const dispatch = useDispatch()
  const [todoDate, setTodoDate] = useTodoDate(date, id)
  const [priority, onSelected] = useSelectPriority(todo.priority)

  const onPriorityHandler = (event: SelectChangeEvent<Priority>) => {
    const priority = event.target.value
    const data = {id, priority}
    onSelected(event)
    sendUpdatedTodo(data)
    dispatch(setPriority(data))
  }

  const onDateSelect = (newDate: IDate) => {
    setTodoDate(newDate)
    sendUpdatedTodo({id, date: newDate})
  }

  return (
    <Box bgcolor={theme.background.paper} minWidth={{mobile: '330px', largeMobile: '400px', tablet: '700px'}}>
      <Box display={'flex'}>
        <InfoCard todo={todo} onComplete={onComplete}/>

        <Box width={'40%'}>
          <Box width={'100%'} height={'100%'} sx={{backgroundColor: '#fafafa'}} padding={'10px 25px'}>
            <DetailActionPanelItem label={'Due date'}>
              <DueDateButton date={todoDate} variant={'Standard'} onPassDateToBaseForm={onDateSelect}/>
            </DetailActionPanelItem>
            <DetailActionPanelItem label={'Set priority'}>
              <PriorityButton initialPriority={priority} changeHandler={onPriorityHandler} variant={'short'}/>
            </DetailActionPanelItem>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsCard;
