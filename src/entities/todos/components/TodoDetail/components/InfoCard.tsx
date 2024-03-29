import React from 'react';
import CheckboxComponent from '@entities/todos/components/Checkbox';
import {Box} from '@mui/material';
import {EditTodoForm} from '@features/todoFeatures/EditTodo';
import TaskOverview from '@entities/todos/components/TodoDetail/components/TaskOverview';
import {ITodo} from '@shared/interfacesAndTypes';
import {useVisable} from '@shared/hooks';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent<Element, Event>) => void
}
const InfoCard = ({todo, onComplete}: Props) => {
  const {label, description} = todo
  const [isEditDetailsOpen, openEditDetails, closeEditDetails] = useVisable(false)
  return (
    <Box mb={'30px'} display={'flex'} width={'60%'} marginRight={'10px'} marginTop={'20px'}>
      <>
        <div>
          <CheckboxComponent onComplete={onComplete} todo={todo}/>
        </div>
        {
            isEditDetailsOpen ? (
                <Box width={'100%'}>
                  <EditTodoForm
                    onClose={closeEditDetails}
                    todo={todo}
                    hideActions/>
                </Box>
            ) : (
                <TaskOverview
                  label={label}
                  description={description}
                  onOpenForm={openEditDetails}/>
            )
        }
      </>
    </Box>
  );
};

export default InfoCard;
