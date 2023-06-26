import {Box, Divider} from '@mui/material';
import DueDateButton from '@entities/dueDateButton';
import PriorityButton from '@entities/setPriorityButton/components/PriorityButton';
import {AddTagsButton} from '@entities/tag';
import {useFormContext} from '@shared/forms/hooks/UseBaseFormContext';

interface Props {
    hideActions?: boolean
}

const FormActions = ({hideActions}: Props) => {
  const {todoDate, setTodoDate, priority, setPriority, todoTags, onSelectTag} = useFormContext()

  return !hideActions ? <>
    <Box display={'flex'} alignItems={'center'} marginBottom={'15px'}>
      <Box mr={'15px'}>
        <DueDateButton date={todoDate} onPassDateToBaseForm={setTodoDate}/>
      </Box>
      <Box mr={'15px'}>
        <PriorityButton initialPriority={priority} changeHandler={setPriority} variant={'standard'}/>
      </Box>
      <Box>
        <AddTagsButton todoTags={todoTags} onAddNewLabel={(newLabel: string) => onSelectTag(newLabel)}/>
      </Box>
    </Box>
    <Divider/>
  </> : null
}


export default FormActions;
