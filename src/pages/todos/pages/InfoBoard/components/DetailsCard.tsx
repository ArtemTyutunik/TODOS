import React, {ChangeEvent} from 'react';
import {Box, Typography, useTheme} from '@mui/material';
import {ITodo} from '@shared/interfacesAndTypes';
import InfoBoardTitle from '@pages/todos/pages/InfoBoard/components/InfoBoardTitle/InfoBoardTitle';
import {useAppDispatch} from '@app/store';
import {editTaskThunk} from '@entities/todos/store/todoThunks';
import TodoDescriptionInput from '@shared/forms/ui/TodoDescriptionInput';
import {styled} from '@mui/material/styles';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent) => void
}

const DetailsCard = ({todo}: Props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [description, setDescription] = React.useState(todo.description)

  const onTitleChange = (value: string) => {
    const updatedTodo = {...todo, label: value}
    dispatch(editTaskThunk({updatedTodo}))
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return (
    <Box bgcolor={theme.background.paper}
      borderRadius={'7px'}>
      <Box display={'flex'}>
        <Box width={'100%'} sx={{wordWrap: 'break-word'}} fontWeight={'bold'}>
          <InfoBoardTitle initValue={todo.label} onTitleChange={onTitleChange}/>
          <DescriptionWrapper ml={'10px'} fontSize={'14px'} color={'#202020'} >
            <Typography fontSize={'inherit'} fontWeight={600}>
              Description
            </Typography>
            <TodoDescriptionInput value={description} onChange={onDescriptionChange}/>
          </DescriptionWrapper>
        </Box>
      </Box>
    </Box>
  );
};

const DescriptionWrapper = styled(Box)(() => ({
  '& textarea': {
    'borderRadius': '5px',
    'padding': '8px',
    '&: hover': {backgroundColor: `rgb(235, 236, 240)`},
    '&: focus': {
      backgroundColor: `#fff`,
    },
  },
}))

export default DetailsCard;
