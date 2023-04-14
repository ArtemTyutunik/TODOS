import {useContext} from 'react';
import {Box, Divider} from '@mui/material';
import DueDateButton from '@shared/components/DueDateComponents';
import PriorityButton from '@shared/components/Priority/PriorityButton';
import AddLabelButton from '@shared/components/AddLabel/AddLabelButton';
import {FormContext} from '@shared/forms/ui/baseTodoForm';

interface Props {
    hideActions?: boolean
}
const SetDataPanel = ({hideActions}: Props) => {
  const {todoDate, setTodoDate, priority, setPriority, Label, setLabel} = useContext(FormContext)

  return !hideActions ? (
    <Box display={'flex'} alignItems={'center'}>
      <Box mr={'15px'}>
        <DueDateButton date={todoDate} onPassDateToBaseForm={setTodoDate}/>
      </Box>
      <Box mr={'15px'}>
        <PriorityButton initialPriority={priority} changeHandler={setPriority} variant={'standard'}/>
      </Box>
      <Box>
        <AddLabelButton initialLabel={Label} onAddNewLabel={(newLabel: string | undefined) => setLabel(newLabel)}/>
      </Box>
      <Divider/>
    </Box>
  ) : null
}


export default SetDataPanel;
